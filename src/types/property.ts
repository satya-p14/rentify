interface Property {
    id: number;
    title: string;
    location: string;
    image: string;
    description: string;
    city: string;
    type: string;
    price: number,
    ownerId: number;
    highlight: boolean;
    datePosted: string;
    verified: boolean;
    availability: string;
    status: 'pending' | 'approved' | 'rejected';
    isNew:boolean
}