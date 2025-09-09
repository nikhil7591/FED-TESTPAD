function mergeBillItemsWithNames(bill, items) {
    return {
        ...bill,
        billItems: bill.billItems.map(billItem => {
            const item = items.find(it => it.id === billItem.id);
            return {
                id: billItem.id,
                name: item ? item.itemName : "",
                quantity: billItem.quantity
            };
        })
    };
}

function calculateBillWithTotal(bill, items, categories) {
    let totalAmount = 0;

    const detailedBillItems = bill.billItems.map(billItem => {
        const item = items.find(it => it.id === billItem.id);
        if (!item) return billItem;

        const categoryInfo = categories.find(cat => cat.id === item.category.categoryId) || {};
        const superCategoryName = categoryInfo.superCategory ? categoryInfo.superCategory.superCategoryName : "";
        const categoryName = categoryInfo.categoryName || "";

        let amount = item.rate * billItem.quantity;

        if (billItem.discount) {
            if (billItem.discount.isInPercent === "Y") {
                amount -= (amount * billItem.discount.rate / 100);
            } else {
                amount -= billItem.discount.rate;
            }
        }

        if (item.taxes && item.taxes.length > 0) {
            item.taxes.forEach(tax => {
                if (tax.isInPercent === "Y") {
                    amount += (amount * tax.rate / 100);
                } else {
                    amount += tax.rate;
                }
            });
        }

        totalAmount += amount;

        return {
            id: billItem.id,
            name: item.itemName,
            quantity: billItem.quantity,
            discount: billItem.discount || {},
            taxes: item.taxes || [],
            amount: parseFloat(amount.toFixed(2)),
            superCategoryName,
            categoryName
        };
    });

    return {
        ...bill,
        billItems: detailedBillItems,
        totalAmount: parseFloat(totalAmount.toFixed(2))
    };
}


const items = [
    {
        id: "item1",
        itemName: "Butter Roti",
        rate: 20,
        taxes: [
            { name: "Service Charge", rate: 10, isInPercent: 'Y' }
        ],
        category: { categoryId: "C2" }
    },
    {
        id: "item2",
        itemName: "Paneer Butter Masala",
        rate: 200,
        taxes: [
            { name: "Service Charge", rate: 10, isInPercent: 'Y' }
        ],
        category: { categoryId: "C1" }
    }
];

const categories = [
    {
        id: "C1",
        categoryName: "Platters",
        superCategory: { superCategoryName: "South Indian", id: "SC1" }
    },
    {
        id: "C2",
        categoryName: "Breads",
        superCategory: { superCategoryName: "North Indian", id: "SC2" }
    }
];

const bill = {
    id: "B1",
    billNumber: 1,
    opentime: "06 Nov 2020 14:19",
    customerName: "CodeQuotient",
    billItems: [
        {
            id: "item2",
            quantity: 3,
            discount: { rate: 10, isInPercent: 'Y' }
        }
    ]
};

console.log(mergeBillItemsWithNames(bill, items));
console.log(calculateBillWithTotal(bill, items, categories));

