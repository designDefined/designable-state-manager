import { createStore as createZustandStore, StoreApi as ZustandStoreApi, ExtractState } from "zustand";
import { getRandomKey, hashKeys } from "./utility";
import { cache } from "./cache";

// Zustand
type ZustandStore<T> = ZustandStoreApi<T>;
type ZustandStoreFactory<T> = Parameters<ReturnType<typeof createZustandStore<T>>>[0];
export type TypeOfZustand<T extends ZustandStore<unknown>> = ExtractState<T>;

// Utility
type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

// Config
type StoreInjectionConfig = {
  local?: boolean;
};

// Base
type Inject<Props extends object, Result extends object> = (
  props: Props,
  config?: StoreInjectionConfig,
) => Store<Result>;
type Extensions = { [k: string]: Inject<never, object> };
type ExtensionResult<E extends Extensions> = UnionToIntersection<TypeOfZustand<ReturnType<E[keyof E]>>>;

// Store
type Store<T> = {
  name: string;
  availableNames: string[];
  store: ZustandStore<T>;
  key: string;
};
type UnknownStore = Store<unknown>;

type StoreBlueprint<Name extends string, Extended extends Extensions> = {
  name: Name;
  extended: Extended;
};
type UnknownStoreBlueprint = StoreBlueprint<string, Extensions>;

type StoreImplementor<
  Blueprint extends UnknownStoreBlueprint,
  Props extends object,
  Result extends ExtensionResult<Blueprint["extended"]>,
> = (props: { injected: Props; extended: Blueprint["extended"] }) => ZustandStoreFactory<Result>;

type StoreImpl<
  Blueprint extends UnknownStoreBlueprint,
  Props extends object,
  Result extends ExtensionResult<Blueprint["extended"]>,
> = Blueprint & {
  implKey: string;
  inject: (props: Props, config?: StoreInjectionConfig) => Store<Result>;
};
type UnknownProps = object;
type UnknownResult = ExtensionResult<Extensions>;
type UnknownStoreImpl = StoreImpl<UnknownStoreBlueprint, UnknownProps, UnknownResult>;

type StoreImplAsExtension<ImplToExtend extends UnknownStoreImpl> = {
  [k in ImplToExtend["name"]]: ImplToExtend["inject"];
};

type StoreImplProps<Impl extends UnknownStoreImpl> =
  Impl extends StoreImpl<UnknownStoreBlueprint, infer Props, UnknownResult> ? Props : never;
type StoreImplResult<Impl extends UnknownStoreImpl> =
  Impl extends StoreImpl<UnknownStoreBlueprint, UnknownProps, infer Result> ? Result : never;

// API
const _create = <Blueprint extends StoreBlueprint<string, Extensions>>(blueprint: Blueprint) => {
  const extend = <StoreImplToExtend extends UnknownStoreImpl>(storeImpl: StoreImplToExtend) => {
    return _create<
      StoreBlueprint<
        Blueprint["name"],
        Blueprint["extended"] & StoreImplToExtend["extended"] & StoreImplAsExtension<StoreImplToExtend>
      >
    >({
      name: blueprint.name,
      extended: {
        ...blueprint.extended,
        ...storeImpl.extended,
        [storeImpl.name]: storeImpl.inject,
      } as Blueprint["extended"] & StoreImplToExtend["extended"] & StoreImplAsExtension<StoreImplToExtend>,
    });
  };

  const implement = <Props extends object, Result extends ExtensionResult<Blueprint["extended"]>>(
    implementor: StoreImplementor<Blueprint, Props, Result>,
  ): StoreImpl<Blueprint, Props, Result> => {
    const implKey = getRandomKey({ prefix: blueprint.name });
    const inject = (props: Props, config?: StoreInjectionConfig): Store<Result> => {
      const key = hashKeys([implKey, props, config?.local ? getRandomKey({ prefix: "local" }) : undefined]);

      const injectStore = (): Store<Result> => {
        const name = blueprint.name;
        const availableNames = [...Object.keys(blueprint.extended), name];
        const zustandFactory = implementor({ injected: props, extended: blueprint.extended });
        return {
          name,
          availableNames,
          store: createZustandStore<Result>()(zustandFactory),
          key,
        };
      };

      return cache.retrieve<Store<Result>>({ key, init: injectStore });
    };
    return {
      ...blueprint,
      inject,
      implKey,
    };
  };

  return {
    ...blueprint,
    extend,
    implement,
  };
};

const create = <Name extends string>({ name }: { name: Name }) => _create({ name, extended: {} });

// Hook API

export { create };

export type { ZustandStore, StoreImplProps, StoreImplResult, UnknownStoreImpl, UnknownStore };
