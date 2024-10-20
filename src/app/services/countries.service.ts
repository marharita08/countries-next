import apiService from "./api.service";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

class CountriesService {
  async getAvailableCountries() {
    return await apiService.get(`${baseUrl}countries/available`);
  }

  async getCountryInfo(countryCode: string) {
    return await apiService.get(`${baseUrl}countries/${countryCode}`);
  }
}

const countriesService = new CountriesService();

export default countriesService;