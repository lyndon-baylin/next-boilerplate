export {};

type MergeTypes<TypesArray extends any[], Res = object> = TypesArray extends [infer Head, ...infer Rem]
  ? MergeTypes<Rem, Res & Head>
  : Res;

type OnlyFirst<F, S> = F & { [Key in keyof Omit<S, keyof F>]?: never };

type NeverOnSet<T> = T extends `set${infer Rem}` ? (Rem extends Capitalize<Rem> ? never : Rem) : T;

declare global {
  // Custom axios error response type
  type AxiosCustomErrorType = {
    code: string;
    status: number;
    message: string;
  };
  /**
   * Only allows one type to be present at a time.
   * @source https://arif.thedev.id/blogs/typescript/the-oneof-type
   */
  type OneOf<TypesArray extends any[], Res = never, AllProperties = MergeTypes<TypesArray>> = TypesArray extends [
    infer Head,
    ...infer Rem,
  ]
    ? OneOf<Rem, Res | OnlyFirst<Head, AllProperties>, AllProperties>
    : Res;

  /**
   * Enhanced typescript's Readonly type.
   *
   * Source: https://www.youtube.com/watch?v=uuOjb7WeXMM
   */
  type BetterReadonly<T, Deep extends boolean = true> = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    readonly [Key in keyof T as T[Key] extends Function ? NeverOnSet<Key> : Key]: Deep extends true
      ? T[Key] extends object
        ? BetterReadonly<T[Key]>
        : T[Key]
      : T[Key];
  };

  // eslint-disable-next-line no-var
  var Object: Omit<ObjectConstructor, 'freeze'> & {
    freeze<T>(o: T): BetterReadonly<T, false>;
  };
}
