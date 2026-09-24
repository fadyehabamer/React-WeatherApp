import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
  __esModule: true,
  default: { fire: jest.fn(() => Promise.resolve({})) }
}));

// API_KEY is read when App.js is loaded, so set it before requiring App
process.env.REACT_APP_OPENWEATHER_API_KEY = 'test-key';
const App = require('./App').default;

const mockFetch = (status, body) => {
  global.fetch = jest.fn(() => Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body)
  }));
};

const search = (city, country) => {
  if (country) userEvent.type(screen.getByLabelText(/country/i), country);
  userEvent.type(screen.getByLabelText(/^city/i), city);
  userEvent.click(screen.getByRole('button', { name: /search/i }));
};

afterEach(() => {
  jest.clearAllMocks();
  delete global.fetch;
});

test('renders the search form', () => {
  render(<App />);
  expect(screen.getByLabelText(/^city/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
});

test('requests metric units with an encoded query and shows zero readings', async () => {
  mockFetch(200, {
    cod: 200,
    name: 'São Paulo',
    main: { temp: 0.2, humidity: 0 },
    weather: [{ main: 'Clear' }]
  });
  render(<App />);
  search('São Paulo', 'BR');

  expect(await screen.findByText('São Paulo')).toBeInTheDocument();
  expect(screen.getByText('0 °C')).toBeInTheDocument();
  expect(screen.getByText('0%')).toBeInTheDocument();
  expect(screen.getByText('Clear')).toBeInTheDocument();

  const url = new URL(global.fetch.mock.calls[0][0]);
  expect(url.searchParams.get('q')).toBe('São Paulo,BR');
  expect(url.searchParams.get('units')).toBe('metric');
});

test('shows a "not found" error for an unknown city', async () => {
  mockFetch(404, { cod: '404', message: 'city not found' });
  render(<App />);
  search('Atlantis');

  await waitFor(() => expect(Swal.fire).toHaveBeenCalledTimes(1));
  expect(Swal.fire.mock.calls[0][0].text).toMatch(/No weather data found for "Atlantis"/);
});

test('shows a connection error when the request fails', async () => {
  global.fetch = jest.fn(() => Promise.reject(new TypeError('Failed to fetch')));
  render(<App />);
  search('London');

  await waitFor(() => expect(Swal.fire).toHaveBeenCalledTimes(1));
  expect(Swal.fire.mock.calls[0][0].text).toMatch(/Could not reach the weather service/);
});
