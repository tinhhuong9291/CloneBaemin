'use client';
import { useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
  totalPage: string;
  limit: string;
  sortField: string;
  sortOrder: string;
}
export default function CustomPagination({
  totalPage,
  limit,
  sortField,
  sortOrder,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') ?? '1');

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={
              currentPage > 1
                ? `?sortOrder=${sortOrder}&sortField=${sortField}&limit=${limit}&page=${currentPage - 1}`
                : '#'
            }
          />
        </PaginationItem>

        {Array.from({ length: Number(totalPage) }).map((_, index) => (
          <PaginationItem key={index}>
            {index + 1 === currentPage ? (
              <PaginationLink isActive href="#">
                {index + 1}
              </PaginationLink>
            ) : (
              <PaginationLink
                href={`?sortOrder=${sortOrder}&sortField=${sortField}&limit=${limit}&page=${index + 1}`}
              >
                {index + 1}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={
              currentPage < Number(totalPage)
                ? `?sortOrder=${sortOrder}&sortField=${sortField}&limit=${limit}&page=${currentPage + 1}`
                : '#'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
