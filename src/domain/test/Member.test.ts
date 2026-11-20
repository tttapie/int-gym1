import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import type { Plan } from "../Member.ts";

describe("Member", () => {
  let member: Member;

  beforeEach(() => {
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
    });
  });

  test("el descuento no puede ser menor a 0", () => {
    expect(() => {
      member.discount = -1;
    }).throw();
  });
  // la razon de ()=>{} arrow function en los throw() es porque
  //JavaScript primero evalúa lo que está entre paréntesis para pasárselo a expect. Al hacer m.discount = -1, el setter tira el error ahí mismo,
  //  y expect ni siquiera llega a ejecutarse. El error queda suelto, el test explota y Vitest lo marca como fallido.
  test("el descuento no puede ser mayor a 100", () => {
    expect(() => {
      member.discount = 101;
    }).throw();
  });
  //Sin () =>: el error ocurre antes de que expect pueda atraparlo.
  //Con () =>: expect ejecuta el código y atrapa el error él mismo.

  test("el descuento no puede ser un numero que no sea un entero", () => {
    expect(() => {
      member.discount = 10.11;
    }).throw();
  });

  test("el descuento vale 0 por defecto", () => {
    expect(member.discount).toBe(0);
  });

  test("acepta los limites 0 y 100", () => {
    member.discount = 100;
    expect(member.discount).toBe(100);
    member.discount = 0;
    expect(member.discount).toBe(0);
  });

  test("el descuento no puede ser NaN", () => {
    expect(() => {
      member.discount = Number.NaN;
    }).throw();
  });

  test("devuelve el descuento junto a los otros datos ", () => {
    member.discount = 10;
    expect(member.toString()).toBe(
      "Ana Pérez (doc. 12345678) - Plan Completo - $1500 - Descuento: 10%",
    );
  });

  test("store name", () => {
    expect(member.name).toBe("Ana Pérez");
  });

  test("store document id", () => {
    expect(member.documentId).toBe("12345678");
  });

  test("store plan", () => {
    expect(member.plan).toBe("full");
  });

  test("store monthly fee", () => {
    expect(member.monthlyFee).toBe(1500);
  });

  test("reject an empty name", () => {
    expect(() => (member.name = "   ")).toThrow();
  });

  test("reject a document id with letters", () => {
    expect(() => (member.documentId = "12a45")).toThrow();
  });

  test("reject a monthly fee of zero", () => {
    expect(() => (member.monthlyFee = 0)).toThrow();
  });

  test("reject an invalid plan", () => {
    expect(() => (member.plan = "gold" as Plan)).toThrow();
  });

  test("reject a monthly fee that is not a number", () => {
    expect(() => (member.monthlyFee = Number.NaN)).toThrow();
  });

  test("show the member as text", () => {
    expect(member.toString()).toBe(
      "Ana Pérez (doc. 12345678) - Plan Completo - $1500",
    );
  });
});
