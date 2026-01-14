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
import {
  ArrowUpDown,
  ChevronDown,
  Crown,
  Medal,
  Trophy,
  Flame,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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

export type LeaderBoard = {
  id: string;
  points: number;
  name: string;
  email: string;
  avatar: string;
};

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


const getLevel = (points: number) => {
  if (points >= 2000) return { label: "Diamond", color: "bg-blue-100 text-blue-600" };
  if (points >= 1500) return { label: "Platinum", color: "bg-purple-100 text-purple-600" };
  if (points >= 1000) return { label: "Gold", color: "bg-yellow-100 text-yellow-700" };
  if (points >= 500) return { label: "Silver", color: "bg-gray-100 text-gray-600" };
  return { label: "Bronze", color: "bg-orange-100 text-orange-700" };
};

const RankCell = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Crown className="h-6 w-6 text-yellow-500" />;
  if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
  if (rank === 3) return <Trophy className="h-6 w-6 text-orange-500" />;
  return <span className="font-semibold text-gray-500">#{rank}</span>;
};


export const columns: ColumnDef<LeaderBoard>[] = [
  {
    id: "rank",
    header: "Rank",
    cell: ({ row }) => <div className="pl-2"><RankCell rank={row.index + 1} /></div>,
  },
  {
    id: "member",
    accessorFn: (row) => row.name,
    header: "Member",
    cell: ({ row }) => {
      const streak = Math.floor(Math.random() * 50) + 1;
      return (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-100 bg-gray-100">
            <Image
              src={row.original.avatar}
              alt={row.original.name}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 dark:text-gray-100">{row.original.name}</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Flame className="h-3 w-3 text-orange-500" /> {streak} day streak
            </span>
          </div>
        </div>
      );
    },
  },
  {
    id: "level",
    header: "Level",
    cell: ({ row }) => {
      const level = getLevel(row.original.points);
      return (
        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", level.color)}>
          {level.label}
        </span>
      )
    }
  },
  {
    id: "leetcode",
    header: () => <div className="flex items-center gap-1"><span className="text-gray-500">&lt;&gt;</span> LeetCode</div>,
    cell: ({ row }) => {
      const val = Math.floor(row.original.points * 0.45);
      return <span className="font-medium text-gray-600 dark:text-gray-300">{val}</span>
    }
  },
  {
    id: "github",
    header: () => <div className="flex items-center gap-1">GitHub</div>,
    cell: ({ row }) => {
      const val = Math.floor(row.original.points * 0.55);
      return <span className="font-medium text-gray-600 dark:text-gray-300">{val}</span>
    }
  },
  {
    accessorKey: "points",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const points = row.original.points;
      const progress = Math.min((points / 2500) * 100, 100);
      return (
        <div className="flex flex-col items-end gap-1">
          <span className="font-bold text-indigo-600 dark:text-indigo-400">{points} pts</span>
          <div className="h-1.5 w-24 rounded-full bg-gray-100 dark:bg-gray-800">
            <div
              className="h-full rounded-full bg-indigo-600"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      );
    },
  },
];

export default function Leaderboard() {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "points", desc: true } // Sort by points descending by default
  ]);
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
    <div className="w-full space-y-4">
      {/* Search Bar */}
      <div className="flex items-center">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search members..."
            value={(table.getColumn("member")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("member")?.setFilterValue(event.target.value)
            }
            className="pl-9 w-full rounded-full bg-white dark:bg-black border-gray-200 dark:border-gray-800"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto rounded-full border-gray-200 dark:border-gray-800 hidden md:flex">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
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

      {/* Table Card */}
      <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/50 overflow-hidden shadow-sm backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-gray-50/50 dark:bg-white/5">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-gray-100 dark:border-white/10">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-muted-foreground font-medium text-xs uppercase tracking-wider py-4">
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-50/80 dark:hover:bg-white/5 border-b border-gray-100 dark:border-white/10 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
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

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-full"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-full"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
