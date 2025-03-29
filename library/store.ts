/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore as createZustandStore, ExtractState, StoreApi as ZustandStoreApi } from "zustand";
import { cache } from "./cache";
import { keyManager, RawKey } from "./key";

// Zustand
type ZustandStore<T> = ZustandStoreApi<T>;
type ZustandStoreFactory<T> = Parameters<ReturnType<typeof createZustandStore<T>>>[0];
export type TypeOfZustand<T extends ZustandStore<unknown>> = ExtractState<T>;

// Config
type StoreInjectionConfig = {
  additionalKey?: RawKey;
};

// Store
type Store<T = unknown> = {
  name: string;
  availableNames: string[];
  key: string;
  client: ZustandStore<T>;
  destroy: () => void;
};
type InterfaceOf<_Store extends Store> = _Store extends Store<infer U> ? U : never;

type StoreBlueprint<Name extends string = string, Input extends object = any, Output extends object = object> = {
  name: Name;
  abstractImpl?: (input: Input) => Output;
};
type NameOf<Blueprint extends StoreBlueprint> = Blueprint extends StoreBlueprint<infer Name> ? Name : never;
type InputOf<Blueprint extends StoreBlueprint> = Blueprint extends StoreBlueprint<string, infer Input> ? Input : never;
type OutputOf<Blueprint extends StoreBlueprint> =
  Blueprint extends StoreBlueprint<string, any, infer Output> ? NonNullable<Output> : never;

type StoreFactory<Name extends string = string, Input extends object = any, Output extends object = object> = {
  name: Name;
  availableNames: string[];
  inject: (input: Input, config?: StoreInjectionConfig) => Store<Output>;
  forEach: (config: { apply: (store: Output) => void }) => void;
};
type ExtendableStoreFactory<Blueprint extends StoreBlueprint> = StoreFactory<string, any, Partial<OutputOf<Blueprint>>>;
type ExtensionMap<Blueprint extends StoreBlueprint, Extensions extends readonly ExtendableStoreFactory<Blueprint>[]> = {
  [Extension in Extensions[number] as NameOf<Extension>]: Extension;
};

const combineExtensions = <
  Blueprint extends StoreBlueprint,
  Extensions extends readonly ExtendableStoreFactory<Blueprint>[],
>(
  extensions: Extensions,
): ExtensionMap<Blueprint, Extensions> => {
  return extensions.reduce(
    (acc, extension) => ({ ...acc, [extension.name]: extension }),
    {} as ExtensionMap<Blueprint, Extensions>,
  );
};

const createBlueprint = <
  Blueprint extends StoreBlueprint,
  Extensions extends readonly ExtendableStoreFactory<Blueprint>[],
>({
  blueprint,
  extensions,
  getDefaultKey,
}: {
  blueprint: Blueprint;
  extensions: Extensions;
  getDefaultKey: (input: InputOf<Blueprint>) => RawKey;
}) => {
  const extend = <Extension extends ExtendableStoreFactory<Blueprint>>(extension: Extension) => {
    return createBlueprint<Blueprint, [...Extensions, Extension]>({
      blueprint,
      extensions: [...extensions, extension],
      getDefaultKey,
    });
  };
  const setDefaultKey = (newFunction: (input: InputOf<Blueprint>) => RawKey) => {
    return createBlueprint<Blueprint, Extensions>({
      blueprint,
      extensions,
      getDefaultKey: newFunction,
    });
  };

  const implement = (
    factoryFunction: (props: {
      name: string;
      key: string;
      injected: InputOf<Blueprint>;
      extended: { [Extension in Extensions[number] as NameOf<Extension>]: Extension };
    }) => { store: ZustandStoreFactory<OutputOf<Blueprint>> },
  ): StoreFactory<NameOf<Blueprint>, InputOf<Blueprint>, OutputOf<Blueprint>> => {
    const name = blueprint.name as NameOf<Blueprint>;
    const availableNames = [name, ...extensions.flatMap(extension => extension.availableNames)];
    const extensionMap = combineExtensions<Blueprint, Extensions>(extensions);

    const inject = (input: InputOf<Blueprint>, config?: StoreInjectionConfig) => {
      const key = keyManager.hash([name, getDefaultKey(input), config?.additionalKey]);
      const injectStore = (): Store<OutputOf<Blueprint>> => {
        const { store: zustandFactory } = factoryFunction({
          name,
          key,
          injected: input,
          extended: extensionMap,
        });
        const client = createZustandStore<OutputOf<Blueprint>>()(zustandFactory);
        const destroy = () => {
          // onDestroy?.();
          cache.remove({ key: key });
        };

        return {
          name,
          availableNames,
          key,
          client,
          destroy,
        };
      };

      return cache.retrieve<Store<OutputOf<Blueprint>>>({
        key,
        init: injectStore,
      });
    };

    const forEach = ({ apply }: { apply: (store: OutputOf<Blueprint>) => void }) => {
      cache.match<Store<OutputOf<Blueprint>>>({
        prefix: name,
        fn: ({ client }) => apply(client.getState()),
      });
    };

    return {
      name,
      availableNames,
      inject,
      forEach,
    };
  };

  return {
    ...blueprint,
    extend,
    setDefaultKey,
    implement,
  };
};

const create = <Input extends object, Output extends object, Name extends string = string>({
  name,
}: {
  name: Name;
}) => {
  return createBlueprint<StoreBlueprint<Name, Input, Output>, []>({
    blueprint: { name },
    extensions: [],
    getDefaultKey: () => undefined,
  });
};

export { create };

export type { InterfaceOf, Store, StoreBlueprint, StoreFactory, ZustandStore };
