import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { faker } from "@faker-js/faker";
import { nextTick } from "vue";
import { it, expect, beforeEach, vitest } from "vitest";
import { useCustomerStore } from "@stores/customer/customerStore";

describe("Customer Store", () => {
  let customer: any;

  beforeEach(() => {
    setActivePinia(createTestingPinia({ createSpy: vitest.fn }));
    customer = useCustomerStore();
  });

  it("Customer is empty", () => {
    expect(customer.customerInfo).toEqual([]);
  });

  it("Customer has data after search processed", async () => {
    expect(customer.customerInfo).toEqual([]);
    await customer.customerSearch();
    expect(customer.customerSearch).toHaveBeenCalledTimes(1);
    customer.$patch({
      customerInfo: [
        {
          address: faker.address.streetAddress(),
          referenceNumber: "TEST001",
          dob: faker.date.birthdate(),
          email: faker.internet.email(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          mobile: faker.phone.number(),
          phone: faker.phone.number(),
          postcode: faker.address.zipCode(),
          status: "1",
          systemName: "TESTSYSTEM",
          title: faker.name.prefix(),
        },
      ],
    });
    nextTick();
    expect(customer.customerInfo).toHaveLength(1);
  });
});
