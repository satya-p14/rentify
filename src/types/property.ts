interface Property {
    id: string;
    title: string;
    location: string;
    images: string[];
    description: string;
    city: string;
    type : string;
    price: string;
    ownerId: string;
    highlight: boolean;
    datePosted: string;
    verified: boolean;
    availability: string;
    status: 'pending' | 'approved' | 'rejected';
    isNew:boolean;
}