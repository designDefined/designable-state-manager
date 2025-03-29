import { create } from "@library";

type IntentStore<I, O> = {
  intend: (input: I) => O | void;
};
type UnknownIntentStore = IntentStore<never, unknown>;
type InputOf<Store extends UnknownIntentStore> = Store extends IntentStore<infer U, unknown> ? U : never;
type OutputOf<Store extends UnknownIntentStore> = Store extends IntentStore<never, infer U> ? U : never;

const createIntentStore = <Store extends IntentStore<never, unknown>, Deps extends object = object>({
  intentName,
  to,
  next,
  catch: _catch,
}: {
  intentName: string;
  to: (deps: Deps) => (i: InputOf<Store>) => OutputOf<Store>;
  next?: (deps: Deps) => ((context: { input: InputOf<Store>; output: OutputOf<Store> }) => void)[];
  catch?: (deps: Deps) => ((context: { input: InputOf<Store>; error: unknown }) => void)[];
}) =>
  create<Deps, IntentStore<InputOf<Store>, OutputOf<Store>>>({ name: `${intentName}IntentStore` }).implement(
    ({ injected }) => ({
      store: () => {
        const intendFn = to(injected);
        const nextFns = next?.(injected);
        const catchFns = _catch?.(injected);
        return {
          intend: input => {
            try {
              const output = intendFn(input);
              nextFns?.forEach(fn => fn({ input, output }));
              return output;
            } catch (error) {
              catchFns?.forEach(fn => fn({ input, error }));
            }
          },
        };
      },
    }),
  );

export { createIntentStore };
export type { IntentStore };
