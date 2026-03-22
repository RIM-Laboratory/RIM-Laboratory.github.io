import yaml from 'js-yaml';
import rawData from './data.yaml?raw';

const parsedData = yaml.load(rawData) as any;

export const labInfo = parsedData.labInfo;
export const news = parsedData.news;
export const publications = parsedData.publications;
export const experience = parsedData.experience;
export const team = parsedData.team;
export const researchAreas = parsedData.researchAreas;
export const openings = parsedData.openings;
export const patents = parsedData.patents;
export const gallery = parsedData.gallery;
