import * as Yup from "yup";
import { Food } from "../../models/Food";

const requiredText = "Campo Requerido";

export const validationScheme = Yup.object<Food>().shape({
  category: Yup.string().required(requiredText),
  description: Yup.string().nullable(),
  name: Yup.string().min(3, "Nombre muy corto").required(requiredText),
  price: Yup.number().min(1, "El precio minimo es $1").required(requiredText),
});
