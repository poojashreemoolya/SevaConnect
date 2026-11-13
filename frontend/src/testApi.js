
import {
  getServices,
  getOffices,
  getAnnouncements
} from './services/api.js';

async function testAPI() {
  try {
    const services = await getServices();
    const offices = await getOffices();
    const announcements = await getAnnouncements();

    console.log('Services:', services);
    console.log('Offices:', offices);
    console.log('Announcements:', announcements);

    console.log('All API functions are working!');
  } catch (error) {
    console.error('API test failed:', error);
  }
}

testAPI();
