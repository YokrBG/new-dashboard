"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon, ChevronDown } from "lucide-react";
import {
  formatDistanceToNowStrict,
  subDays,
  subHours,
  subMinutes
} from "date-fns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ExportButton } from "@/components/CardActionMenus";

type Conversation = {
  id: string;
  customerName: string;
  createdAt: Date;
  status: "needs-attention" | "in-progress" | "completed" | "lost" | "on-hold";
};

function formatTimeToNow(date: Date) {
  const [value, unit] = formatDistanceToNowStrict(date).split(" ");
  const short = unit.startsWith("second")
    ? "s"
    : unit.startsWith("minute")
      ? "min"
      : unit.startsWith("hour")
        ? "h"
        : unit.startsWith("day")
          ? "d"
          : unit.startsWith("month")
            ? "mo"
            : unit.startsWith("year")
              ? "y"
              : unit;
  return short === "min" ? `${value} min ago` : `${value}${short} ago`;
}

const data: Conversation[] = [
  {
    id: "1083",
    customerName: "Marvin Dekidis",
    createdAt: subMinutes(new Date(), 2),
    status: "needs-attention"
  },
  {
    id: "1082",
    customerName: "Carter Lipshitz",
    createdAt: subHours(new Date(), 1),
    status: "in-progress"
  },
  {
    id: "1081",
    customerName: "Addison Philips",
    createdAt: subMinutes(new Date(), 30),
    status: "needs-attention"
  },
  {
    id: "1079",
    customerName: "Craig Siphron",
    createdAt: subHours(new Date(), 5),
    status: "on-hold"
  },
  {
    id: "1078",
    customerName: "Emma Johnson",
    createdAt: subHours(new Date(), 8),
    status: "completed"
  },
  {
    id: "1077",
    customerName: "Michael Smith",
    createdAt: subDays(new Date(), 1),
    status: "completed"
  },
  {
    id: "1076",
    customerName: "Sarah Williams",
    createdAt: subHours(new Date(), 20),
    status: "in-progress"
  },
  {
    id: "1075",
    customerName: "James Brown",
    createdAt: subDays(new Date(), 2),
    status: "lost"
  },
  {
    id: "1074",
    customerName: "David Miller",
    createdAt: subMinutes(new Date(), 5),
    status: "needs-attention"
  },
  {
    id: "1073",
    customerName: "Jennifer Davis",
    createdAt: subMinutes(new Date(), 12),
    status: "in-progress"
  },
  {
    id: "1072",
    customerName: "Robert Wilson",
    createdAt: subHours(new Date(), 3),
    status: "completed"
  },
  {
    id: "1071",
    customerName: "Lisa Anderson",
    createdAt: subHours(new Date(), 4),
    status: "on-hold"
  },
  {
    id: "1070",
    customerName: "Thomas Taylor",
    createdAt: subDays(new Date(), 3),
    status: "needs-attention"
  },
  {
    id: "1069",
    customerName: "Patricia Moore",
    createdAt: subDays(new Date(), 4),
    status: "lost"
  },
  {
    id: "1068",
    customerName: "Christopher White",
    createdAt: subDays(new Date(), 5),
    status: "completed"
  },
  {
    id: "1067",
    customerName: "Elizabeth Harris",
    createdAt: subDays(new Date(), 6),
    status: "in-progress"
  }
];

const columns: ColumnDef<Conversation>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 80
  },
  {
    accessorKey: "customerName",
    header: "Conversation"
  },
  {
    accessorKey: "createdAt",
    header: "Time",
    cell: ({ row }) => formatTimeToNow(row.getValue("createdAt") as Date)
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      const statusMap: Record<
        Conversation["status"],
        "success" | "info" | "warning" | "destructive"
      > = {
        completed: "success",
        "in-progress": "warning",
        "needs-attention": "warning",
        lost: "destructive",
        "on-hold": "warning"
      };

      const statusClass = statusMap[status] ?? "default";

      return (
        <Badge variant={statusClass} className="capitalize">
          {status.replace("-", " ")}
        </Badge>
      );
    }
  }
];

export function InboxShortcutCard() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
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
      rowSelection
    },
    initialState: {
      pagination: {
        pageSize: 6
      }
    }
  });

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Latest Conversations</CardTitle>
        <CardDescription>Analyze growth and changes in visitor patterns</CardDescription>
        <CardAction>
          <ExportButton />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <div className="font-display text-2xl lg:text-3xl">43</div>
            <div className="flex gap-2">
              <div className="text-muted-foreground text-sm">New Conversations</div>
              <div className="flex items-center gap-0.5 text-xs text-green-500">
                <ArrowUpIcon className="size-3" />
                0.5%
              </div>
            </div>
            <Progress
              value={43}
              className="h-2 bg-blue-100 dark:bg-blue-950"
              indicatorColor="bg-blue-400"
            />
          </div>
          <div className="space-y-2">
            <div className="font-display text-2xl lg:text-3xl">12</div>
            <div className="flex gap-2">
              <div className="text-muted-foreground text-sm">Need Attention</div>
              <div className="flex items-center gap-0.5 text-xs text-red-500">
                <ArrowDownIcon className="size-3" />
                0.3%
              </div>
            </div>
            <Progress
              value={25}
              className="h-2 bg-teal-100 dark:bg-teal-950"
              indicatorColor="bg-teal-400"
            />
          </div>
          <div className="space-y-2">
            <div className="font-display text-2xl lg:text-3xl">40</div>
            <div className="flex gap-2">
              <div className="text-muted-foreground text-sm">Converted</div>
              <div className="flex items-center gap-0.5 text-xs text-green-500">
                <ArrowUpIcon className="size-3" />
                0.5%
              </div>
            </div>
            <Progress
              value={40}
              className="h-2 bg-green-100 dark:bg-green-950"
              indicatorColor="bg-green-400"
            />
          </div>
          <div className="space-y-2">
            <div className="font-display text-2xl lg:text-3xl">2</div>
            <div className="flex gap-2">
              <div className="text-muted-foreground text-sm">Lost</div>
              <div className="flex items-center gap-0.5 text-xs text-red-500">
                <ArrowDownIcon className="size-3" />
                0.5%
              </div>
            </div>
            <Progress
              value={48}
              className="h-2 bg-orange-100 dark:bg-orange-950"
              indicatorColor="bg-orange-400"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Filter conversations..."
              value={(table.getColumn("customerName")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("customerName")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
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
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
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
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <div className="text-muted-foreground flex-1 text-sm">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
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
      </CardContent>
    </Card>
  );
}
