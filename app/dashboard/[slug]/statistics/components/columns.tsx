"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/ui/badge";

import { labels, priorities, statuses } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Task>[] = [
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
  {
    accessorKey: "Player",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Player" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.Player);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("Player")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "Cost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cost" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("Cost")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "selectedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SelectedBy" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("selectedBy")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "Top15",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Top15" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("Top15")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "Form",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Form" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("Form")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "Pts",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pts" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("Pts")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
