import ArrowLeft from "@/components/icons/ArrowLeft";
import Image from "next/image";

export default function FormStepTwo() {
  return (
    <form>
      <fieldset>
        <button>
          <ArrowLeft />
          Anterior
        </button>
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Autor
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Ej.: James Clear"
              className="form-input"
              required
            />
          </label>
        </div>
        <fieldset>
          <legend>Tipo de acceso</legend>
          <label htmlFor="">
            <input type="radio" name="access-type" id="" />
            Gratis
          </label>
          <label htmlFor="">
            <input type="radio" name="access-type" id="" />
            De pago
          </label>
        </fieldset>
        <div>
          <label htmlFor="">
            Foto de Portada
            <input type="file" name="" id="" />
            <Image
              src="/input-file-placeholder.png"
              alt=""
              width={80}
              height={100}
            />
          </label>
        </div>

        <button>Guardar cambios</button>
      </fieldset>
    </form>
  );
}
