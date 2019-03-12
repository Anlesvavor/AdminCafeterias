import {Product} from "./product.model";
import {Provider} from "./provider.model";

export interface Order {
  product : Product,
  quantity : Number,
  unit : String,
  provider : Provider
}
