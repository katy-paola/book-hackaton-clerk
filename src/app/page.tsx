import Close from "@/components/icons/Close";
import styles from "./page.module.css";
import Add from "@/components/icons/Add";
import Filter from "@/components/icons/Filter";
import Search from "@/components/icons/Search";
import Link from "next/link";
import More from "@/components/icons/More";

export default function Home() {
  return (
    <section className={styles.page}>
      <h1>
        Nunca pierdas un libro. Guarda y organiza tus lecturas fácilmente.
      </h1>
      <p>
        Crea tu colección personal, explora listas públicas y mantén a mano todo
        lo que quieres leer.
      </p>
      <main>
        <header>
          <h2>Publicado por otros</h2>
          <Link href="/add" aria-label="Agregar libro">
            <Add />
          </Link>
        </header>
        <section>
          <div role="search">
            <Search />
            <input
              type="text"
              name="search"
              placeholder="Buscar libros..."
              aria-label="Buscar por título, autor, categoría, descripción o nombre de quien publicó"
            />
          </div>
          <section>
            <Filter />
            <form action="" aria-label="Filtrar libros">
              <button type="button">
                <Close />
                Cerrar
              </button>
              <fieldset>
                <label htmlFor="search-input">
                  <Search />
                  <input
                    id="search-input"
                    type="search"
                    name="search"
                    placeholder="Buscar libros"
                    aria-label="Buscar por título, autor, categoría, descripción o nombre de quien publicó"
                  />
                </label>
                <fieldset>
                  <legend>Categorías</legend>
                  <label htmlFor="finanzas">
                    <input
                      id="finanzas"
                      type="checkbox"
                      name="finanzas"
                      value="finanzas"
                    />
                    Finanzas
                  </label>
                  <label htmlFor="matematicas">
                    <input
                      id="matematicas"
                      type="checkbox"
                      name="matematicas"
                      value="matematicas"
                    />
                    Matemáticas
                  </label>
                  <label htmlFor="programacion">
                    <input
                      id="programacion"
                      type="checkbox"
                      name="programacion"
                      value="programacion"
                    />
                    Programación
                  </label>
                  <label htmlFor="autoayuda">
                    <input
                      id="autoayuda"
                      type="checkbox"
                      name="autoayuda"
                      value="autoayuda"
                    />
                    Autoayuda
                  </label>
                  <label htmlFor="literatura">
                    <input
                      id="literatura"
                      type="checkbox"
                      name="literatura"
                      value="literatura"
                    />
                    Literatura
                  </label>
                  <button type="button">Ver todas las categorías</button>
                </fieldset>
                <fieldset>
                  <legend>Tipo de acceso</legend>
                  <label htmlFor="gratis">
                    <input
                      id="gratis"
                      type="checkbox"
                      name="gratis"
                      value="gratis"
                    />
                    Gratis
                  </label>
                  <label htmlFor="de-pago">
                    <input
                      id="de-pago"
                      type="checkbox"
                      name="de-pago"
                      value="de-pago"
                    />
                    De pago
                  </label>
                </fieldset>
                <button type="submit">Aplicar filtros</button>
              </fieldset>
            </form>
            <form action="" aria-label="Ver todas las categorías">
              <button type="button">
                <Close />
                Cerrar
              </button>
              <fieldset>
                <legend>Categorías</legend>
                <label htmlFor="search-categories-input">
                  <Search />
                  <input
                    id="search-categories-input"
                    type="search"
                    name="search"
                    placeholder="Buscar categorías"
                    aria-label="Buscar entre todas las categorías disponibles"
                  />
                </label>
                <label htmlFor="finanzas">
                  <input
                    id="finanzas"
                    type="checkbox"
                    name="finanzas"
                    value="finanzas"
                  />
                  Finanzas
                </label>
                <label htmlFor="matematicas">
                  <input
                    id="matematicas"
                    type="checkbox"
                    name="matematicas"
                    value="matematicas"
                  />
                  Matemáticas
                </label>
                <label htmlFor="programacion">
                  <input
                    id="programacion"
                    type="checkbox"
                    name="programacion"
                    value="programacion"
                  />
                  Programación
                </label>
                <label htmlFor="autoayuda">
                  <input
                    id="autoayuda"
                    type="checkbox"
                    name="autoayuda"
                    value="autoayuda"
                  />
                  Autoayuda
                </label>
                <label htmlFor="literatura">
                  <input
                    id="literatura"
                    type="checkbox"
                    name="literatura"
                    value="literatura"
                  />
                  Literatura
                </label>
                <button type="submit">Aplicar</button>
              </fieldset>
            </form>
          </section>
        </section>
        <p>Se encontraron 5 resultados para “Patrones de lectura”.</p>
        <p>
          No se encontraron resultados para “Patrones de lectura”. Intenta con
          otra palabra clave.
        </p>
        <p>
          No se encontraron resultados que coincidan con los filtros aplicados.
        </p>
        <div role="complementary" aria-label="Controles de filtros">
          <button type="button">Limpiar filtros</button>
        </div>
        <ul>
          <li>
            <article>
              <header>
                <h3>Hábitos atómicos</h3> - <span>Autoayuda</span>
                <p>James Clear</p>
                <small>De pago</small>
              </header>
              <div>
                <Link href="#">Ir al libro</Link>
                <div>
                  <button
                    id="menu-actions-button-1"
                    aria-label="Más acciones"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-controls="menu1"
                  >
                    <More />
                  </button>
                  <ul
                    role="menu"
                    aria-labelledby="menu-actions-button-1"
                    id="menu-1"
                  >
                    <li role="menuitem">
                      <Link href="#">Ver detalles</Link>
                    </li>
                    <li role="menuitem">
                      {/* Si el libro ya está guardado, se muestra "Quitar libro". */}
                      <button>Guardar libro</button>
                    </li>
                    <li role="menuitem">
                      <Link href="#">Editar</Link>
                    </li>
                    <li role="menuitem">
                      <button>Eliminar</button>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </li>
          <li>
            <article>
              <header>
                <h3>El hombre en busca de sentido</h3> - <span>Autoayuda</span>
                <p>Viktor Frankl</p>
                <small>Gratis</small>
              </header>
              <div>
                <Link href="#">Ir al libro</Link>
                <div>
                  <button
                    id="menu-actions-button-2"
                    aria-label="Más acciones"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-controls="menu2"
                  >
                    <More />
                  </button>
                  <ul
                    role="menu"
                    aria-labelledby="menu-actions-button-2"
                    id="menu-2"
                  >
                    <li role="menuitem">
                      <Link href="#">Ver detalles</Link>
                    </li>
                    <li role="menuitem">
                      {/* Si el libro ya está guardado, se muestra "Quitar libro". */}
                      <button>Guardar libro</button>
                    </li>
                    <li role="menuitem">
                      <Link href="#">Editar</Link>
                    </li>
                    <li role="menuitem">
                      <button>Eliminar</button>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </li>
          <li>
            <article>
              <header>
                <h3>El poder del ahora</h3> - <span>Autoayuda</span>
                <p>Eckhart Tolle</p>
                <small>De pago</small>
              </header>
              <div>
                <Link href="#">Ir al libro</Link>
                <div>
                  <button
                    id="menu-actions-button-3"
                    aria-label="Más acciones"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-controls="menu3"
                  >
                    <More />
                  </button>
                  <ul
                    role="menu"
                    aria-labelledby="menu-actions-button-3"
                    id="menu-3"
                  >
                    <li role="menuitem">
                      <Link href="#">Ver detalles</Link>
                    </li>
                    <li role="menuitem">
                      {/* Si el libro ya está guardado, se muestra "Quitar libro". */}
                      <button>Guardar libro</button>
                    </li>
                    <li role="menuitem">
                      <Link href="#">Editar</Link>
                    </li>
                    <li role="menuitem">
                      <button>Eliminar</button>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </li>
          <li>
            <article>
              <header>
                <h3>Los secretos de la mente millonaria</h3> -{" "}
                <span>Autoayuda</span>
                <p>T. Harv Eker</p>
                <small>Gratis</small>
              </header>
              <div>
                <Link href="#">Ir al libro</Link>
                <div>
                  <button
                    id="menu-actions-button-4"
                    aria-label="Más acciones"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-controls="menu4"
                  >
                    <More />
                  </button>
                  <ul
                    role="menu"
                    aria-labelledby="menu-actions-button-4"
                    id="menu-4"
                  >
                    <li role="menuitem">
                      <Link href="#">Ver detalles</Link>
                    </li>
                    <li role="menuitem">
                      {/* Si el libro ya está guardado, se muestra "Quitar libro". */}
                      <button>Guardar libro</button>
                    </li>
                    <li role="menuitem">
                      <Link href="#">Editar</Link>
                    </li>
                    <li role="menuitem">
                      <button>Eliminar</button>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </li>
          <li>
            <article>
              <header>
                <h3>Cómo ganar amigos e influir sobre las personas</h3> -{" "}
                <span>Autoayuda</span>
                <p>Dale Carnegie</p>
                <small>De pago</small>
              </header>
              <div>
                <Link href="#">Ir al libro</Link>
                <div>
                  <button
                    id="menu-actions-button-5"
                    aria-label="Más acciones"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-controls="menu5"
                  >
                    <More />
                  </button>
                  <ul
                    role="menu"
                    aria-labelledby="menu-actions-button-5"
                    id="menu-5"
                  >
                    <li role="menuitem">
                      <Link href="#">Ver detalles</Link>
                    </li>
                    <li role="menuitem">
                      {/* Si el libro ya está guardado, se muestra "Quitar libro". */}
                      <button>Guardar libro</button>
                    </li>
                    <li role="menuitem">
                      <Link href="#">Editar</Link>
                    </li>
                    <li role="menuitem">
                      <button>Eliminar</button>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </li>
        </ul>
      </main>
    </section>
  );
}
