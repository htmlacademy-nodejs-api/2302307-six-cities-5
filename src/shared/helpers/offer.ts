import {City, Convenience, Coordinates, HousingType, Offer, User, UserType} from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    postDate,
    city,
    previewPicture,
    housingPictures,
    isPremium,
    isFavorite,
    rating,
    housingType,
    roomCount,
    guestCount,
    price,
    conveniences,
    commentCount,
    coordinates,
    author
  ] = offerData.replace('\n', '').split('\t');

  const formattedCoordinates: Coordinates = {
    latitude: parseFloat(coordinates.split(';')[0]),
    longitude: parseFloat(coordinates.split(';')[1])
  };

  const formattedAuthor: User = {
    name: author.split(';')[0],
    email: author.split(';')[1],
    avatar: author.split(';')[2],
    password: author.split(';')[3],
    userType: author.split(';')[4] as UserType,
  };

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: city as City,
    previewPicture,
    housingPictures: housingPictures.split(';'),
    isPremium: isPremium as unknown as boolean,
    isFavorite: isFavorite as unknown as boolean,
    rating: parseFloat(rating),
    housingType: housingType as HousingType,
    roomCount: parseInt(roomCount, 10),
    guestCount: parseInt(guestCount, 10),
    price: parseInt(price, 10),
    conveniences: conveniences.split(';')
      .map((convenience) => convenience as Convenience),
    commentCount: parseInt(commentCount, 10),
    coordinates: formattedCoordinates,
    author: formattedAuthor
  };
}
