"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const data: LeaderBoard[] = [
  {
    id: "m5gr84i9",
    points: 316,
    name: "ken99",
    email: "ken99@example.com",
    avatar: "/images/test_bg2.jpg",
  },
  {
    id: "3u1reuv4",
    points: 242,
    name: "Abe45",
    avatar: "/images/test_bg2.jpg",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    points: 837,
    name: "Monserrat44",
    avatar: "/images/test_bg.png",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    points: 874,
    name: "Silas22",
    avatar: "/images/test_bg2.jpg",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    points: 721,
    name: "carmella",
    avatar: "/images/test_bg2.jpg",
    email: "carmella@example.com",
  },
  {
    id: "bhqecj4p",
    points: 721,
    name: "carmella",
    avatar: "/images/test_bg.png",
    email: "carmella@example.com",
  },
  {
    id: "bhqecj4p",
    points: 721,
    name: "carmella",
    avatar: "/images/test_bg2.jpg",
    email: "carmella@example.com",
  },
  {
    id: "bhqecj4p",
    points: 721,
    name: "carmella",
    avatar: "/images/test_bg.png",
    email: "carmella@example.com",
  },
  {
    id: "bhqecj4p",
    points: 721,
    name: "carmella",
    avatar: "/images/test_bg2.jpg",
    email: "carmella@example.com",
  },
  {
    id: "bhqecj4p",
    points: 721,
    name: "carmella",
    avatar: "/images/test_bg.png",
    email: "carmella@example.com",
  },
  {
    id: "bhqecj4p",
    points: 721,
    name: "carmella",
    avatar: "/images/test_bg2.jpg",
    email: "carmella@example.com",
  },
];

export type LeaderBoard = {
  id: string;
  points: number;
  name: string;
  email: string;
  avatar: string;
};

export const columns: ColumnDef<LeaderBoard>[] = [
  {
    accessorKey: "avatar",
    header: () => <div className="text-right"></div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center">
          <Image
            className="rounded-full bg-cover"
            width={24}
            height={24}
            src={row.getValue("avatar")}
            alt="avatar"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden sm:flex"
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase hidden sm:block">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "points",
    header: () => <div className="text-right">Points</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("points"));

      return <div className="text-right font-medium">{amount}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.email)}
            >
              Copy email ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View user</DropdownMenuItem>
            {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function Leaderboard() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full  sm:pl-3">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="w-1/2 sm:max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto text-black">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden ">
        <Table className=" overflow-clip">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className=" text-amber-50">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className=" first:text overflow-clip "
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2 text-black">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
