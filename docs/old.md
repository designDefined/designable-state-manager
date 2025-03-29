```

// type StoreFactory<
//   Blueprint extends UnknownStoreBlueprint,
//   Props extends object,
//   Result extends ExtensionResult<Blueprint["extended"]>,
// > = Blueprint & {
//   inject: (props: Props, config?: StoreInjectionConfig) => Store<Result>;
//   forEach: (config: { apply: (store: Result) => void }) => void;
// };
// type UnknownProps = never;
// type UnknownResult = ExtensionResult<Extensions>;
// type UnknownStoreFactory = StoreFactory<UnknownStoreBlueprint, UnknownProps, UnknownResult>;
// type StoreFactoryAsExtension<ImplToExtend extends UnknownStoreFactory> = {
//   [k in ImplToExtend["name"]]: { blueprintKey: string; inject: ImplToExtend["inject"] };
// };

// type StoreFactoryProps<Impl extends UnknownStoreFactory> =
//   Impl extends StoreFactory<UnknownStoreBlueprint, infer Props, UnknownResult> ? Props : never;
// type StoreFactoryResult<Impl extends UnknownStoreFactory> =
//   Impl extends StoreFactory<UnknownStoreBlueprint, UnknownProps, infer Result> ? Result : never;

// // Store
// type Store<T> = {
//   name: string;
//   blueprintKey: string;
//   availableKeys: string[];
//   key: string;
//   client: ZustandStore<T>;
//   destroy: () => void;
// };
// type UnknownStore = Store<unknown>;

// // API
// const createBluePrint = <Blueprint extends UnknownStoreBlueprint>(blueprint: Blueprint) => {
//   const extend = <FactoryToExtend extends UnknownStoreFactory>(factoryToExtend: FactoryToExtend) => {
//     if (Object.keys(blueprint.extended).includes(factoryToExtend.name)) {
//       throw new Error(
//         `Cannot extend store of same name "${factoryToExtend.name}". It ocurred on extending "${blueprint.name}".`,
//       );
//     }
//     return createBluePrint<
//       StoreBlueprint<
//         Blueprint["name"],
//         Blueprint["extended"] & FactoryToExtend["extended"] & StoreFactoryAsExtension<FactoryToExtend>
//       >
//     >({
//       name: blueprint.name,
//       blueprintKey: blueprint.blueprintKey,
//       extended: {
//         ...blueprint.extended,
//         ...factoryToExtend.extended,
//         [factoryToExtend.name]: { blueprintKey: factoryToExtend.blueprintKey, inject: factoryToExtend.inject },
//       } as Blueprint["extended"] & FactoryToExtend["extended"] & StoreFactoryAsExtension<FactoryToExtend>,
//     });
//   };

//   const implement = <Props extends object, Result extends ExtensionResult<Blueprint["extended"]>>(
//     implementor: StoreFactoryImplementor<Blueprint, Props, Result>,
//   ): StoreFactory<Blueprint, Props, Result> => {
//     const inject = (props: Props, config?: StoreInjectionConfig): Store<Result> => {
//       const key = hashKeys([blueprint.blueprintKey, config?.local ? getRandomKey({ prefix: "local" }) : props]);
//       const injectStore = (): Store<Result> => {
//         const extendedKeys = Object.values(blueprint.extended).map(({ blueprintKey }) => blueprintKey);
//         const availableKeys = [...extendedKeys, blueprint.blueprintKey];
//         const {
//           store: zustandFactory,
//           onDestroy,
//           key: overridedKey,
//         } = implementor({ injected: props, extended: blueprint.extended });
//         const destroy = () => {
//           onDestroy?.();
//           cache.remove({ key: key });
//         };
//         return {
//           name: blueprint.name,
//           blueprintKey: blueprint.blueprintKey,
//           availableKeys,
//           key,
//           store: createZustandStore<Result>()(zustandFactory),
//           destroy,
//         };
//       };
//       return cache.retrieve<Store<Result>>({ key: key, init: injectStore });
//     };

//     const forEach = ({ apply }: { apply: (store: Result) => void }) => {
//       cache.match<Store<Result>>({ prefix: blueprint.blueprintKey, fn: ({ store }) => apply(store.getState()) });
//     };

//     return {
//       ...blueprint,
//       inject,
//       forEach,
//     };
//   };

//   return {
//     ...blueprint,
//     extend,
//     implement,
//   };
// };

// const create = <Name extends string>({ name }: { name: Name }) =>
//   createBluePrint({ name, blueprintKey: getRandomKey({ prefix: name }), extended: {} });
```
