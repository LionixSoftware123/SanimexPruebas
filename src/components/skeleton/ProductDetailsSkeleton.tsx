import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export default function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Thumbnails */}
        <div className="hidden md:flex md:col-span-1 flex-col gap-4">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="aspect-square w-full" />
          ))}
        </div>

        {/* Main Image */}
        <div className="md:col-span-7">
          <Skeleton className="aspect-[4/3] w-full rounded-lg" />
        </div>

        {/* Product Info */}
        <div className="md:col-span-4 space-y-6">
          {/* Brand Logo */}
          <Skeleton className="h-8 w-32" />

          {/* Product Title */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <div className="flex gap-4 items-baseline">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Cajas:</span>
            <div className="flex items-center">
              <Button variant="outline" size="icon" disabled>
                -
              </Button>
              <Skeleton className="h-10 w-12 mx-2" />
              <Button variant="outline" size="icon" disabled>
                +
              </Button>
            </div>
          </div>

          {/* SKU */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">SKU:</span>
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full" disabled>
              AGREGAR AL CARRITO
            </Button>
            <Button variant="outline" className="w-full" disabled>
              SOLICITAR INFORMACIÓN
            </Button>
          </div>

          {/* Delivery Info */}
          <Skeleton className="h-4 w-full" />

          {/* Calculator Section */}
          <div className="space-y-4 border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-10 w-16" />
              <Button disabled>Calcular</Button>
            </div>
          </div>

          {/* Additional Material */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
