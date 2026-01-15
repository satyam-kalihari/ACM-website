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
  Crown,
  Medal,
  Trophy,
  Flame,
  Search,
  Github,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
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
  streak: number;
  level: "Diamond" | "Platinum" | "Gold" | "Silver" | "Bronze";
};

const data: LeaderBoard[] = [
  {
    id: "alex_chen",
    points: 2097,
    name: "Alex Chen",
    email: "alex@example.com",
    avatar: "/images/test_bg2.jpg",
    streak: 42,
    level: "Diamond",
  },
  {
    id: "sarah_jh",
    points: 1703,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "/images/test_bg.png",
    streak: 21,
    level: "Platinum",
  },
  {
    id: "mike_smith",
    points: 1487,
    name: "Mike Smith",
    email: "mike@example.com",
    avatar: "/images/test_bg2.jpg",
    streak: 11,
    level: "Platinum",
  },
  {
    id: "emily_d",
    points: 1309,
    name: "Emily Davis",
    email: "emily@example.com",
    avatar: "/images/test_bg.png",
    streak: 28,
    level: "Gold",
  },
  {
    id: "james_w",
    points: 1184,
    name: "James Wilson",
    email: "james@example.com",
    avatar: "/images/test_bg2.jpg",
    streak: 25,
    level: "Gold",
  },
  {
    id: "lisa_p",
    points: 1088,
    name: "Lisa Park",
    email: "lisa@example.com",
    avatar: "/images/test_bg.png",
    streak: 22,
    level: "Gold",
  },
  {
    id: "david_k",
    points: 976,
    name: "David Kim",
    email: "david@example.com",
    avatar: "/images/test_bg2.jpg",
    streak: 19,
    level: "Silver",
  },
  {
    id: "anna_l",
    points: 903,
    name: "Anna Lee",
    email: "anna@example.com",
    avatar: "/images/test_bg.png",
    streak: 17,
    level: "Silver",
  },
  {
    id: "chris_b",
    points: 843,
    name: "Chris Brown",
    email: "chris@example.com",
    avatar: "/images/test_bg2.jpg",
    streak: 15,
    level: "Silver",
  },
  {
    id: "megan_t",
    points: 777,
    name: "Megan Taylor",
    email: "megan@example.com",
    avatar: "/images/test_bg.png",
    streak: 12,
    level: "Bronze",
  },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "Diamond":
      return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    case "Platinum":
      return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
    case "Gold":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "Silver":
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    default:
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
  }
};

const RankIcon = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Trophy className="h-5 w-5 text-orange-500" />;
  return <span className="font-semibold text-muted-foreground">#{rank}</span>;
};


const PodiumItem = ({
  user,
  rank,
}: {
  user: LeaderBoard;
  rank: 1 | 2 | 3;
}) => {
  const isFirst = rank === 1;
  const size = isFirst ? 120 : 100;
  const ringColor =
    rank === 1
      ? "ring-yellow-400"
      : rank === 2
        ? "ring-gray-300"
        : "ring-orange-400";
  const icon =
    rank === 1 ? (
      <Crown className="w-8 h-8 text-yellow-500 fill-yellow-500 mb-2" />
    ) : rank === 2 ? (
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 font-bold text-lg mb-2 border border-gray-200 dark:border-gray-700">
        2
      </div>
    ) : (
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 font-bold text-lg mb-2 border border-orange-200 dark:border-orange-800">
        3
      </div>
    );

  return (
    <div
      className={cn(
        "flex flex-col items-center",
        isFirst ? "-mt-8 z-10" : "mt-4"
      )}
    >
      {isFirst && icon}
      <div className="relative group">
        <div
          className={cn(
            "rounded-full p-1 bg-white dark:bg-black ring-4 shadow-xl transition-transform transform group-hover:scale-105",
            ringColor
          )}
        >
          <div
            className="overflow-hidden rounded-full"
            style={{ width: size, height: size }}
          >
            <Image
              src={user.avatar}
              alt={user.name}
              width={size}
              height={size}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        {!isFirst && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            {icon}
          </div>
        )}
      </div>
      <div className="mt-4 text-center">
        <h3 className="font-bold text-lg text-foreground">{user.name}</h3>
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
          {user.points} pts
        </p>
      </div>
    </div>
  );
};

export const columns: ColumnDef<LeaderBoard>[] = [
  {
    id: "rank",
    header: "Rank",
    cell: ({ row }) => (
      <div className="pl-4">
        <RankIcon rank={row.index + 1} />
      </div>
    ),
  },
  {
    id: "member",
    accessorFn: (row) => row.name,
    header: "Member",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-full border border-border bg-muted">
          <Image
            src={row.original.avatar}
            alt={row.original.name}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-foreground">
            {row.original.name}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Flame className="h-3 w-3 text-orange-500 fill-orange-500" />{" "}
            {row.original.streak} day streak
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "level",
    header: "Level",
    cell: ({ row }) => (
      <span
        className={cn(
          "px-2.5 py-0.5 rounded-full text-xs font-medium border border-transparent",
          getLevelColor(row.original.level)
        )}
      >
        {row.original.level}
      </span>
    ),
  },
  {
    id: "leetcode",
    header: () => (
      <div className="flex items-center gap-1">
        <Code2 className="h-4 w-4" /> LeetCode
      </div>
    ),
    cell: ({ row }) => {
      const val = Math.floor(row.original.points * 0.45);
      return <span className="font-medium text-muted-foreground">{val}</span>;
    },
  },
  {
    id: "github",
    header: () => (
      <div className="flex items-center gap-1">
        <Github className="h-4 w-4" /> GitHub
      </div>
    ),
    cell: ({ row }) => {
      const val = Math.floor(row.original.points * 0.55);
      return <span className="font-medium text-muted-foreground">{val}</span>;
    },
  },
  {
    accessorKey: "points",
    header: () => <div className="text-right pr-4">Total</div>,
    cell: ({ row }) => (
      <div className="text-right pr-4 font-bold text-indigo-600 dark:text-indigo-400">
        {row.original.points} pts
      </div>
    ),
  },
];

export default function Leaderboard({ isDashboard = false }: { isDashboard?: boolean }) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "points", desc: true },
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

  const topThree = data.slice(0, 3);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 pb-10">
      {/* Header & Podium Section - Only show if NOT on dashboard */}
      {!isDashboard && (
        <div className="text-center space-y-8 pt-8">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
              <Trophy className="w-3 h-3 mr-1" />
              Competitive Rankings
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Leaderboard
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Climb the ranks by solving LeetCode problems and contributing to
              GitHub projects.
            </p>
          </div>

          {/* Podium */}
          <div className="flex justify-center items-end gap-4 md:gap-12 mt-12 mb-16 h-[280px]">
            {/* Rank 2 */}
            <PodiumItem user={topThree[1]} rank={2} />
            {/* Rank 1 */}
            <PodiumItem user={topThree[0]} rank={1} />
            {/* Rank 3 */}
            <PodiumItem user={topThree[2]} rank={3} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="bg-white dark:bg-zinc-900/50 rounded-3xl p-6 md:p-8 shadow-sm border border-border/50">
        {/* Search Bar */}
        <div className="flex items-center mb-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              value={
                (table.getColumn("member")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("member")?.setFilterValue(event.target.value)
              }
              className="pl-10 h-12 w-full rounded-full bg-gray-50 dark:bg-white/5 border-transparent focus:border-indigo-500 focus:ring-indigo-500/20 shadow-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md">
          <Table>
            <TableHeader className="bg-gray-50/50 dark:bg-white/5 border-none">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="hover:bg-transparent border-none"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-muted-foreground font-medium text-xs uppercase tracking-wider py-4 first:rounded-l-lg last:rounded-r-lg"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-gray-50/80 dark:hover:bg-white/5 border-b border-gray-100 dark:border-white/5 transition-colors group"
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
                    No members found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination/Footer within table card */}
        <div className="flex items-center justify-between py-4 border-t border-gray-100 dark:border-white/5 mt-4">
          <div className="text-sm text-muted-foreground">
            Showing {table.getRowModel().rows.length} of {data.length} members
          </div>
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

      {/* Connect Accounts Footer - Only show if NOT on dashboard */}
      {!isDashboard && (
        <div className="text-center space-y-6 pt-8 pb-8">
          <h3 className="text-lg font-medium text-foreground">
            Connect your accounts to start climbing the leaderboard
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              variant="outline"
              className="rounded-full h-11 px-6 border-gray-200 dark:border-gray-800 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <Code2 className="w-4 h-4 mr-2" />
              Connect LeetCode
            </Button>
            <Button
              variant="outline"
              className="rounded-full h-11 px-6 border-gray-200 dark:border-gray-800 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <Github className="w-4 h-4 mr-2" />
              Connect GitHub
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
