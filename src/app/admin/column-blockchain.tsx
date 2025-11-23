import { blockchainTable } from "@/lib/schema";
import { ColumnDef } from "@tanstack/react-table";

export const blockchainColumn: ColumnDef<blockchainTable>[] = [
  {
    accessorKey: "height",
    header: "Block"
  },
  {
    accessorKey: "timestamp",
    header: "timestamp",
    cell: ({ row }) => {
      const timestamp = row.getValue("timestamp") as number;
      const date = new Date(timestamp * 1000);
      const value = date.toLocaleString()
      return (
        <div>{value}</div>
      );
    },
  },
  {
    accessorKey: "transactions_type",
    header: "transactions_type",
  },
]