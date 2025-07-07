'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input"

export default function OperationsOnTable({
  searchTerm,
  setSearchTerm,
  status,
  setStatus,
  priority,
  setPriority,
}: {
  searchTerm: string,
  setSearchTerm: (value: string) => void,
  status: string,
  setStatus: (value: string) => void,
  priority: string,
  setPriority: (value: string) => void,
}) {
  const handleReset = () => {
    setSearchTerm('');
    setStatus('');
    setPriority('');
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between my-6">
      {/* Search input */}
      <Input
        placeholder="Search by title or description..."
        className="w-full md:max-w-xs"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-wrap items-center gap-3">
        {/* Status filter */}
        <CustomDropDown
          buttonName="Status"
          buttonLabel="Filter by Status"
          dropDownItems={['In progress', 'Pending', 'Resolved']}
          selected={status}
          onSelect={setStatus}
        />

        {/* Priority filter */}
        <CustomDropDown
          buttonName="Priority"
          buttonLabel="Filter by Priority"
          dropDownItems={['Low', 'Medium', 'High']}
          selected={priority}
          onSelect={setPriority}
        />

        {/* Reset */}
        <Button
          size="sm"
          variant="destructive"
          onClick={handleReset}
        >
          Reset All
        </Button>
      </div>
    </div>
  );
}

export function CustomDropDown({
  buttonName,
  buttonLabel,
  dropDownItems,
  selected,
  onSelect
}: {
  buttonName: string,
  buttonLabel: string,
  dropDownItems: string[],
  selected: string,
  onSelect: (value: string) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          {buttonName}{selected ? `: ${selected}` : ''}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>{buttonLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selected}
          onValueChange={(value) => onSelect(value)}
        >
          {dropDownItems.map((item) => (
            <DropdownMenuRadioItem
              key={item}
              value={item}
              className="capitalize"
            >
              {item}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
