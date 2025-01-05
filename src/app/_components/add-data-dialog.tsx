'use client';

import { Button } from '../../components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import React, { useEffect } from 'react';
import { createResident, createResidentMigration } from '../../db/service';
import { Resident, ResidentMigration } from '../../lib/types';
import { isServiceMethodSuccess } from '../../lib';
import { Textarea } from '../../components/ui/textarea';

export default function AddDataDialog<TData>({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
}) {
  const [error, setError] = React.useState<string | null>(null);
  const [nik, setNik] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [address, setAddress] = React.useState<string>('');
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const [desc, setDesc] = React.useState<string>('');
  const [gender, setGender] = React.useState<'Male' | 'Female' | null>(null);
  const [isLocalResident, setIsLocalResident] = React.useState<boolean | null>(
    null
  );
  const [originalAddress, setOriginalAddress] = React.useState<string>('');
  const [isFormValid, setIsFormValid] = React.useState<boolean>(false);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    if (nik.length > 16) {
      setIsFormValid(false);
    }
    const fields = [nik, name, address, phoneNumber, gender, isLocalResident];
    fields.forEach((field) => {
      if (field === '') {
        setIsFormValid(false);
        return;
      } else if (field === null) {
        setIsFormValid(false);
        return;
      } else {
        setIsFormValid(true);
      }
    });
  }, [nik, name, address, phoneNumber, gender, isLocalResident]);

  async function handleSubmit() {
    if (
      !nik ||
      !name ||
      !address ||
      !phoneNumber ||
      isLocalResident === null ||
      (isLocalResident === false && !originalAddress) ||
      gender === null
    ) {
      return;
    }

    const resident: Resident = {
      nik: nik,
      name: name,
      address: address,
      gender: gender,
      status: 'Active',
      phone_number: phoneNumber,
      is_local_resident: isLocalResident,
      created_at: new Date(),
      updated_at: new Date(),
    };

    if (!resident.is_local_resident) {
      resident.original_address = originalAddress || resident.address;
    }

    const residentResult = await createResident(resident);
    if (!isServiceMethodSuccess(residentResult)) {
      setError(residentResult.message);
    }

    const migration: ResidentMigration = {
      resident_id: residentResult as number,
      migration_status: 'In',
      migration_date: new Date(),
      new_address: resident.address,
      created_at: new Date(),
    };

    if (desc) {
      migration.description = desc;
    }

    const migrationResult = await createResidentMigration(migration);
    if (!isServiceMethodSuccess(migrationResult)) {
      setError(migrationResult.message);
    }

    setData((prev) => [resident as TData, ...prev]);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <Plus />
          <span>Tambah</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Data Penduduk</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-y-4'>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='nik'>NIK</Label>
            <Input
              className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
              type='number'
              id='nik'
              placeholder='NIK...'
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              required
              maxLength={16}
            />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='nama'>Nama</Label>
            <Input
              type='text'
              id='nama'
              placeholder='Nama Lengkap...'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='alamat'>Alamat</Label>
            <Input
              type='text'
              id='alamat'
              placeholder='Alamat Lengkap...'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='nomor-telepon'>Nomor Telepon</Label>
            <Input
              type='text'
              id='nomor-telepon'
              placeholder='+62...'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='jenis-kelamin'>Jenis Kelamin</Label>
            <Select
              onValueChange={(value) => setGender(value as 'Female' | 'Male')}
            >
              <SelectTrigger className='max-w-sm'>
                <SelectValue placeholder='Jenis Kelamin' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='Male'>Laki-laki</SelectItem>
                  <SelectItem value='Female'>Perempuan</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='Warga Lokal'>Warga Lokal</Label>
            <Select
              onValueChange={(value) => setIsLocalResident(value === 'true')}
            >
              <SelectTrigger className='max-w-sm'>
                <SelectValue placeholder='Warga Lokal' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='true'>Ya</SelectItem>
                  <SelectItem value='false'>Bukan</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {!isLocalResident && (
            <>
              <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor='deskripsi-tambahan'>Deskripsi Tambahan</Label>
                <Textarea
                  placeholder='(Opsional) Deskripsi tambahan...'
                  id='deskripsi-tambahan'
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor='alamat-asal'>Alamat Asal</Label>
                <Input
                  type='text'
                  id='alamat-asal'
                  placeholder='Alamat Asal...'
                  value={originalAddress}
                  onChange={(e) => setOriginalAddress(e.target.value)}
                />
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='submit' variant='outline'>
              Batal
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type='submit'
              variant='secondary'
              onClick={handleSubmit}
              disabled={!isFormValid}
            >
              Simpan
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
