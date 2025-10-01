type RegisterAnniversaryTicket = {
  file: any;
  ticketNumber: string;
  store: string;
};

type RegisterAnniversaryVideo = {
  file: any;
  caption: string;
};

export type RegisterAnniversaryUserInput = {
  name?: string;
  age?: string;
  email?: string;
  phone?: string;
  state?: string;
  postalCode?: string;
  ticket?: RegisterAnniversaryTicket;
  video?: RegisterAnniversaryVideo;
};
