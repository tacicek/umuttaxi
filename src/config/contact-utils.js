import contactData from './contact.json';

// Utility functions for accessing contact information
export const getContactInfo = () => contactData.contact;
export const getCompanyInfo = () => contactData.company;
export const getBusinessInfo = () => contactData.business;
export const getServices = () => contactData.services;
export const getLocations = () => contactData.locations;
export const getSocialLinks = () => contactData.social;

// Common contact patterns
export const getPhoneLink = (phoneType = 'primary') => {
  const phone = contactData.contact.phone[phoneType];
  return phone ? `tel:${phone}` : '#';
};

export const getEmailLink = (emailType = 'info') => {
  const email = contactData.contact.email[emailType];
  return email ? `mailto:${email}` : '#';
};

export const getAddressString = () => contactData.contact.address.full;

export const getBusinessHours = () => {
  const hours = contactData.business.hours;
  return Object.entries(hours).map(([day, time]) => `${day}: ${time}`).join(', ');
};

export default contactData;
