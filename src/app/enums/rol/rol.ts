/**
 * Enumerado del rol del usuario. Debe coincidir con los ids de la base de datos, pero
 * se almacenan de esta forma para ahorrar una información que nunca va a cambiar
 * en el tiempo.
 *
 * @export
 * @enum {number}
 */
export enum Rol {
  usuario = 1,
  admin,
}
