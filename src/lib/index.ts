import { residentsTable } from "@/db/schema";

export function isServiceMethodSuccess<T>(result: T | Error): result is T {
  return !(result instanceof Error);
}

export function generateRandomNumbers(length: number): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}

export function generateRandomString(length: number): string {
  return Array.from({ length }, () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 97)
  ).join('');
}
export function generateRandomDate(): Date {
  return new Date(Date.now() - Math.floor(Math.random() * 10000000000));
}

type Resident = typeof residentsTable.$inferSelect;
export function getDummyResidents(n: number) {
  try {
    const residents: Resident[] = [];
    for (let i = 0; i < n; i++) {
      const resident: Resident = {
        id: i + 1,
        nik: generateRandomNumbers(16),
        name: generateRandomString(20),
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        address: generateRandomString(30),
        phone_number: generateRandomNumbers(20),
        status: Math.random() > 0.5 ? 'Active' : 'Migrated',
        created_at: generateRandomDate(),
        is_local_resident: Math.random() > 0.5,
        original_address: '',
        updated_at: new Date(),
      };

      if (!resident.is_local_resident) {
        resident.original_address = generateRandomString(30);
      } else {
        resident.original_address = resident.address;
      }

      resident.updated_at = resident.created_at;
      residents.push(resident);
    }
    return residents;
  } catch (e) {
    return new Error(
      `Failed to generate residents: ${
        e instanceof Error ? e.message : 'Unknown error'
      }`
    );
  }
}
