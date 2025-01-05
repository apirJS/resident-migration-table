'use client';

import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

import { CellContext } from '@tanstack/react-table';
import { PenLine } from 'lucide-react';
import React, { useEffect } from 'react';
import { Textarea } from '../../components/ui/textarea';
import { Resident, ResidentMigration } from '../../lib/types';
import { createResidentMigration, updateResident } from '../../db/service';
import { isServiceMethodSuccess } from '../../lib';
import { Checkbox } from '../../components/ui/checkbox';

type Props = CellContext<
  {
    id: number;
    nik: string;
    name: string;
    gender: 'Male' | 'Female';
    address: string;
    original_address: string | null;
    phone_number: string;
    is_local_resident: boolean;
    status: 'Active' | 'Migrated';
    created_at: Date;
    updated_at: Date;
  },
  unknown
>;

export default function EditDataDialog({
  row: { original, index },
  table,
}: Props) {
  const [nik, setNik] = React.useState<string>(original.nik);
  const [name, setName] = React.useState<string>(original.name);
  const [address, setAddress] = React.useState<string>(original.address);
  const [phoneNumber, setPhoneNumber] = React.useState<string>(
    original.phone_number
  );
  const [gender, setGender] = React.useState<'Male' | 'Female'>(
    original.gender
  );
  const [isLocalResident, setIsLocalResident] = React.useState<boolean>(
    original.is_local_resident
  );
  const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
  const [originalAddress, setOriginalAddress] = React.useState<string>(
    original.original_address || original.address
  );
  const [desc, setDesc] = React.useState<string>('');
  const [isResidentMigrating, setIsResidentMigrating] =
  React.useState<boolean>(original.status === "Migrated");
  const [migrationDestination, setMigrationDestination] = React.useState<
    'Out' | 'In'
  >(isResidentMigrating ? 'Out' : 'In');

  useEffect(() => {
    const fields = [
      nik,
      name,
      address,
      phoneNumber,
      gender,
      isLocalResident,
      migrationDestination,
    ];

    const isFormNotEmpty = fields.some((field) => field);

    if (isFormNotEmpty) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [
    nik,
    name,
    address,
    phoneNumber,
    gender,
    isLocalResident,
    migrationDestination,
  ]);

  async function handleSave() {
    if (!isFormValid) {
      return;
    }

    const resident: Resident = {
      nik,
      name,
      address,
      gender,
      updated_at: new Date(),
      phone_number: phoneNumber,
      is_local_resident: isLocalResident,
      status: isResidentMigrating ? 'Migrated' : 'Active',
    };

    if (isResidentMigrating) {
      resident.address = address;
      resident.original_address = originalAddress || original.address;

      const migration: ResidentMigration = {
        resident_id: original.id,
        migration_status: migrationDestination ?? "In",
        migration_date: new Date(),
        new_address: address,
        description: desc,
        created_at: new Date(),
      };

      if (desc) {
        migration.description = desc;
      }

      const migrationResult = await createResidentMigration(migration);
      if (!isServiceMethodSuccess(migrationResult)) {
        alert(migrationResult.message);
      }
    }

    const residentResult = await updateResident(original.id, resident);
    if (!isServiceMethodSuccess(residentResult)) {
      alert(residentResult.message);
    }

    table.options.meta?.updateData(index, resident);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost'>
          <PenLine />
          <span>Edit Data</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Data Penduduk</DialogTitle>
          <DialogDescription>
            Silahkan ubah data penduduk yang ingin diubah.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-y-4'>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='nama'>NIK</Label>
            <Input
              type='text'
              id='nama'
              value={nik}
              required
              onChange={(e) => setNik(e.target.value)}
            />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='nama'>Nama</Label>
            <Input
              type='text'
              id='nama'
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {!isResidentMigrating && (
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='alamat'>Alamat</Label>
              <Input
                type='text'
                id='alamat'
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          )}
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='nomor-telepon'>Nomor Telepon</Label>
            <Input
              type='text'
              id='nomor-telepon'
              value={phoneNumber}
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <Select
            onValueChange={(value) => setGender(value as 'Female' | 'Male')}
          >
            <SelectTrigger className='max-w-sm'>
              <SelectValue
                placeholder={gender === 'Male' ? 'Laki-laki' : 'Perempuan'}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='Male'>Laki-laki</SelectItem>
                <SelectItem value='Female'>Perempuan</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => setIsLocalResident(value === 'true')}
          >
            <SelectTrigger className='max-w-sm'>
              <SelectValue
                placeholder={
                  isLocalResident ? 'Warga Lokal' : 'Warga Non-Lokal'
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='true'>Warga Lokal</SelectItem>
                <SelectItem value='false'>Warga Non-Lokal</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className='items-top flex space-x-2'>
            <Checkbox
              id='alamat'
              checked={isResidentMigrating}
              onCheckedChange={(checked) =>
                setIsResidentMigrating(checked as boolean)
              }
            />
            <div className='grid gap-1.5 leading-none'>
              <label
                htmlFor='alamat'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Pindah Alamat
              </label>
              <p className='text-sm text-muted-foreground'>
                Ceklis jika penduduk pindah alamat.
              </p>
            </div>
          </div>
          {isResidentMigrating && (
            <>
              <Select
                onValueChange={(value) =>
                  setMigrationDestination(value as 'Out' | 'In')
                }
              >
                <SelectTrigger className='max-w-sm'>
                  <SelectValue
                    placeholder={
                      migrationDestination === 'In'
                        ? 'Pindah Ke Dalam Desa'
                        : 'Pindah Keluar Desa'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='In'>Pindah Keluar Desa</SelectItem>
                    <SelectItem value='Out'>Pindah Ke Dalam Desa</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor='alamat-asal'>Alamat Asal</Label>
                <Input
                  type='text'
                  id='alamat-asal'
                  value={originalAddress}
                  onChange={(e) => setOriginalAddress(e.target.value)}
                />
              </div>
              <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor='alamat-baru'>Alamat Baru</Label>
                <Input
                  type='text'
                  id='alamat-baru'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor='deskripsi-tambahan'>Deskripsi Tambahan</Label>
                <Textarea
                  placeholder='(Opsional) Deskripsi tambahan...'
                  id='deskripsi-tambahan'
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Batal</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant='secondary'
              disabled={!isFormValid}
              onClick={handleSave}
            >
              Simpan
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
