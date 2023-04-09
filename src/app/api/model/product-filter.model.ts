export default class ProductFilter {
  constructor(
    public readonly name: string,
    public readonly type: string,
    public readonly isSelected = false,
  ) { }
}
