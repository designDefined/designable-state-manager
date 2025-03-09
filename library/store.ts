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
type Injectable<Props extends UnknownProps, Result extends UnknownResult> = {
  serialKey: string;
  inject: (props: Props, config?: StoreInjectionConfig) => Store<Result>;
};
type Extensions = { [k: string]: Injectable<never, object> };
type ExtensionResult<E extends Extensions> = UnionToIntersection<TypeOfZustand<ReturnType<E[keyof E]["inject"]>>>;

// Store

type StoreBlueprint<Name extends string, Extended extends Extensions> = {
  name: Name;
  serialKey: string;
  extended: Extended;
};
type UnknownStoreBlueprint = StoreBlueprint<string, Extensions>;

type StoreFactoryImplementor<
  Blueprint extends UnknownStoreBlueprint,
  Props extends object,
  Result extends ExtensionResult<Blueprint["extended"]>,
> = (props: { injected: Props; extended: Blueprint["extended"] }) => {
  store: ZustandStoreFactory<Result>;
  onDestroy?: () => void;
};

type StoreFactory<
  Blueprint extends UnknownStoreBlueprint,
  Props extends object,
  Result extends ExtensionResult<Blueprint["extended"]>,
> = Blueprint & {
  inject: (props: Props, config?: StoreInjectionConfig) => Store<Result>;
};
type UnknownProps = never;
type UnknownResult = ExtensionResult<Extensions>;
type UnknownStoreFactory = StoreFactory<UnknownStoreBlueprint, UnknownProps, UnknownResult>;
type StoreFactoryAsExtension<ImplToExtend extends UnknownStoreFactory> = {
  [k in ImplToExtend["name"]]: { serialKey: string; inject: ImplToExtend["inject"] };
};

type StoreFactoryProps<Impl extends UnknownStoreFactory> =
  Impl extends StoreFactory<UnknownStoreBlueprint, infer Props, UnknownResult> ? Props : never;
type StoreFactoryResult<Impl extends UnknownStoreFactory> =
  Impl extends StoreFactory<UnknownStoreBlueprint, UnknownProps, infer Result> ? Result : never;

type Store<T> = {
  name: string;
  serialKey: string;
  availableKeys: string[];
  storeKey: string;
  store: ZustandStore<T>;
  destroy: () => void;
};
type UnknownStore = Store<unknown>;

// API
const createBluePrint = <Blueprint extends UnknownStoreBlueprint>(blueprint: Blueprint) => {
  const extend = <FactoryToExtend extends UnknownStoreFactory>(factoryToExtend: FactoryToExtend) => {
    if (Object.keys(blueprint.extended).includes(factoryToExtend.name)) {
      throw new Error(
        `Cannot extend store of same name "${factoryToExtend.name}". It ocurred on extending "${blueprint.name}".`,
      );
    }
    return createBluePrint<
      StoreBlueprint<
        Blueprint["name"],
        Blueprint["extended"] & FactoryToExtend["extended"] & StoreFactoryAsExtension<FactoryToExtend>
      >
    >({
      name: blueprint.name,
      serialKey: blueprint.serialKey,
      extended: {
        ...blueprint.extended,
        ...factoryToExtend.extended,
        [factoryToExtend.name]: { serialKey: factoryToExtend.serialKey, inject: factoryToExtend.inject },
      } as Blueprint["extended"] & FactoryToExtend["extended"] & StoreFactoryAsExtension<FactoryToExtend>,
    });
  };

  const implement = <Props extends object, Result extends ExtensionResult<Blueprint["extended"]>>(
    implementor: StoreFactoryImplementor<Blueprint, Props, Result>,
  ): StoreFactory<Blueprint, Props, Result> => {
    const inject = (props: Props, config?: StoreInjectionConfig): Store<Result> => {
      const storeKey = hashKeys([blueprint.serialKey, config?.local ? getRandomKey({ prefix: "local" }) : props]);
      const injectStore = (): Store<Result> => {
        const extendedKeys = Object.values(blueprint.extended).map(({ serialKey }) => serialKey);
        const availableKeys = [...extendedKeys, blueprint.serialKey];
        const { store: zustandFactory, onDestroy } = implementor({ injected: props, extended: blueprint.extended });
        const destroy = () => {
          onDestroy?.();
          cache.remove({ key: storeKey });
        };
        return {
          name: blueprint.name,
          serialKey: blueprint.serialKey,
          availableKeys,
          storeKey,
          store: createZustandStore<Result>()(zustandFactory),
          destroy,
        };
      };

      return cache.retrieve<Store<Result>>({ key: storeKey, init: injectStore });
    };
    return {
      ...blueprint,
      inject,
    };
  };

  return {
    ...blueprint,
    extend,
    implement,
  };
};

const create = <Name extends string>({ name }: { name: Name }) =>
  createBluePrint({ name, serialKey: getRandomKey({ prefix: name }), extended: {} });

// Hook API

export { create };

export type {
  ZustandStore,
  StoreBlueprint,
  UnknownStoreBlueprint,
  UnknownProps,
  UnknownResult,
  StoreFactory,
  StoreFactoryProps,
  StoreFactoryResult,
  UnknownStoreFactory,
  Store,
  UnknownStore,
};
