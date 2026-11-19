import type { Member } from "./Member.ts";

export class MemberList {
  #items: Member[] = [];

  add(item: Member): void {
    const exists = this.#items.some(
      (member) => member.documentId === item.documentId,
    );
    if (exists) {
      throw new Error("Ya existe un socio con ese documento.");
    }
    this.#items.push(item);
  }

 updateFee(documentId: string, fee: number): void {
  let encontrado = false;
  for (const member of this.#items) {
    if (member.documentId === documentId) {
      member.monthlyFee = fee;
      encontrado = true;
    }
  }
  if (!encontrado) {
    throw new Error(`El socio con el documento ${documentId} no existe.`);
  }
}

  getItems(): readonly Member[] {
    return [...this.#items];
  }

  totalFees(): number {
    return this.#items.reduce((total, member) => total + member.monthlyFee, 0);
  }
  //reduce recorre un array y lo reduce a un solo valor. Para eso va acumulando un resultado elemento por elemento.
  totalDiscounted(): number {
    return this.#items.reduce((total, member) => {
      const cuota = (member.monthlyFee * (100 - member.discount)) / 100;
      return total + cuota;
    }, 0); // 0 es el valor con el que arranca el acumulador y
  }

  //totalDiscounted(): number {
  // let total = 0;
  //  for(const m of this.#items){
  //  const cuota = m.monthlyFee * (100 - m.discount) / 100;
  //  total = total + cuota;
  //}
  //}
}
