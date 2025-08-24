"use client";

import { Paging } from "@/models/pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "../Pagination";

interface DataListProps<
  T extends {
    id: number;
  },
> {
  columns: (keyof T & string)[];
  data: T[];
  paging: Paging;
}

function DataList<
  T extends {
    id: number;
  },
>({ columns, data, paging }: DataListProps<T>) {
  return (
    <>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              {columns.map((col) => {
                return <TableHead key={col}>{col.toUpperCase()}</TableHead>;
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                {columns.map((col) => {
                  return (
                    <TableCell key={col}>{String(item[col] ?? "")}</TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Pagination {...paging}></Pagination>
      </div>
    </>
  );
}

export default DataList;
