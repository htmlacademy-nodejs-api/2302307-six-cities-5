import {OfferGenerator} from './offer-generator.interface.js';
import {MockServerData} from '../../types/index.js';
import {
  generateRandomNumber,
  getRandomBoolean,
  getRandomItemFromArray,
  getRandomItemsFromArray,
  getRandomSliceFromArray
} from '../../helpers/index.js';
import {CommentCount, GuestCount, HOUSING_PICTURES_COUNT, Price, Rating, RoomCount} from './const.js';

export class TsvOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {
  }

  public generate(): string {
    const title = getRandomItemFromArray(this.mockData.titles);
    const description = getRandomItemFromArray(this.mockData.descriptions);
    const postDate = getRandomItemFromArray(this.mockData.postDates);
    const city = getRandomItemFromArray(this.mockData.cities);
    const previewPicture = getRandomItemFromArray(this.mockData.previewPictures);
    const housingPictures = getRandomItemsFromArray(this.mockData.housingPictures, HOUSING_PICTURES_COUNT)
      .join(';');
    const isPremium = getRandomBoolean().toString();
    const isFavorite = getRandomBoolean().toString();
    const rating = generateRandomNumber(Rating.Min, Rating.Max).toString();
    const housingType = getRandomItemFromArray(this.mockData.housingTypes);
    const roomCount = generateRandomNumber(RoomCount.Min, RoomCount.Max).toString();
    const guestCount = generateRandomNumber(GuestCount.Min, GuestCount.Max).toString();
    const price = generateRandomNumber(Price.Min, Price.Max).toString();
    const conveniences = getRandomSliceFromArray(this.mockData.conveniences)
      .join(';');
    const commentCount = generateRandomNumber(CommentCount.Min, CommentCount.Max).toString();
    const coordinates = Object.values(getRandomItemFromArray(this.mockData.coordinates))
      .join(';');
    const author = Object.values(this.mockData.author)
      .map((values) => getRandomItemFromArray(values))
      .join(';');

    return [
      title, description, postDate, city, previewPicture, housingPictures,
      isPremium, isFavorite, rating, housingType, roomCount, guestCount,
      price, conveniences, commentCount, coordinates, author
    ].join('\t');
  }
}
