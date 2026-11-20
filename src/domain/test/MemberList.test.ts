import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import { MemberList } from "../MemberList.ts";

describe("MemberList", () => {
  let list: MemberList;
  let member: Member;

  beforeEach(() => {
    list = new MemberList();
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
    });
  });

  test("Create an empty member list", () => {
    expect(list.getItems()).toEqual([]);
  });

  test("add a member", () => {
    list.add(member);
    expect(list.getItems()).toEqual([member]);
  });

  test("reject a duplicated document id", () => {
    list.add(member);
    expect(() => list.add(member)).toThrow();
  });

  test("total fees", () => {
    list.add(member);
    expect(list.totalFees()).toBe(1500);
  });

  test("lista vacía devuelve 0", () => {
    expect(list.totalDiscounted()).toBe(0);
  });

  test("aplica descuento parcial", () => {
    member.discount = 10;
    list.add(member);
    expect(list.totalDiscounted()).toBe(1350); // 1500 - 10%
  });

  test("suma varios socios con y sin descuento (ejemplo de la letra)", () => {
    const m1 = new Member({
      name: "Ana",
      documentId: "111",
      plan: "basic",
      monthlyFee: 1000,
    });
    const m2 = new Member({
      name: "Luis",
      documentId: "222",
      plan: "basic",
      monthlyFee: 500,
    });
    m1.discount = 10;
    list.add(m1);
    list.add(m2);
    expect(list.totalDiscounted()).toBe(1400);
  });

  test("updateFee cambia la cuota del socio", () => {
    list.add(member);
    list.updateFee(member.documentId, 2000);
    expect(member.monthlyFee).toBe(2000);
  });

  test("updateFee encuentra al socio aunque no sea el primero", () => {
    const m2 = new Member({
      name: "Luis",
      documentId: "222",
      plan: "basic",
      monthlyFee: 500,
    });
    list.add(member);
    list.add(m2);
    list.updateFee("222", 800);
    expect(m2.monthlyFee).toBe(800);
  });

  test("updateFee lanza error si el socio no existe", () => {
    list.add(member);
    expect(() => list.updateFee("999", 800)).toThrow();
  });

  test("updateFee lanza error si la lista está vacía", () => {
    expect(() => list.updateFee("111", 800)).toThrow();
  });

  test("updateFee lanza error si la cuota es inválida", () => {
    list.add(member);
    expect(() => list.updateFee(member.documentId, -5)).toThrow();
  });
});
