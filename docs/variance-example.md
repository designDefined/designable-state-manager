```tsx
const noFn = () => {};
const strFn = (arg: string) => {};
const strNumFn = (arg: string | number) => {};

const fnModifier1 = (fn: () => void) => {
  fn();
};
const fnModifier2 = (fn: (arg: never) => void) => console.log(fn);

const fnModifer3 =
  <T extends string>(fn: (arg: T) => void) =>
  (arg: T) => {
    console.log(arg.charAt(0));
    return fn(arg);
  };

fnModifier1(noFn);
fnModifier1(strFn);

fnModifier2(noFn);
fnModifier2(strFn);

fnModifer3(noFn);
fnModifer3(strFn);
fnModifer3(strNumFn);

type Injectable<T> = {
  inject: (dependency: T) => unknown;
};

const numberInjectable: Injectable<number> = {
  inject: deps => {
    deps.toFixed();
  },
};

const modifyInjectable = <T extends Injectable<never>>(injectable: T) => {
  console.log(injectable);
  // a.inject();
  return injectable;
};

modifyInjectable(numberInjectable);
```
