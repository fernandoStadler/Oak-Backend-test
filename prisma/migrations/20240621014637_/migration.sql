-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "productCode" SERIAL NOT NULL,
    "productDescription" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productPrice" MONEY NOT NULL,
    "availableForSale" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Products_productCode_key" ON "Products"("productCode");
