import { mapSnakeCaseToCamelCase } from '../index';

describe('mapSnakeCaseToCamelCase', () => {
  describe('Object conversion', () => {
    it('should convert simple object keys from snake_case to camelCase', () => {
      const input = {
        user_id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email_address: 'john@example.com',
      };

      const expected = {
        userId: 1,
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'john@example.com',
      };

      expect(mapSnakeCaseToCamelCase(input)).toEqual(expected);
    });

    it('should handle object with mixed case keys', () => {
      const input = {
        user_id: 1,
        firstName: 'John', // already camelCase
        last_name: 'Doe',
        emailAddress: 'john@example.com', // already camelCase
      };

      const expected = {
        userId: 1,
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'john@example.com',
      };

      expect(mapSnakeCaseToCamelCase(input)).toEqual(expected);
    });

    it('should handle empty object', () => {
      const input = {};
      const expected = {};

      expect(mapSnakeCaseToCamelCase(input)).toEqual(expected);
    });

    it('should handle object with no snake_case keys', () => {
      const input = {
        id: 1,
        name: 'John',
        email: 'john@example.com',
      };

      const expected = {
        id: 1,
        name: 'John',
        email: 'john@example.com',
      };

      expect(mapSnakeCaseToCamelCase(input)).toEqual(expected);
    });
  });

  describe('Array conversion', () => {
    it('should convert array of objects with snake_case keys', () => {
      const input = [
        { user_id: 1, first_name: 'John' },
        { user_id: 2, first_name: 'Jane' },
      ];

      const expected = [
        { userId: 1, firstName: 'John' },
        { userId: 2, firstName: 'Jane' },
      ];

      expect(mapSnakeCaseToCamelCase(input)).toEqual(expected);
    });

    it('should handle empty array', () => {
      const input: any[] = [];
      const expected: any[] = [];

      expect(mapSnakeCaseToCamelCase(input)).toEqual(expected);
    });

    it('should handle array with mixed data types', () => {
      const input = [{ user_id: 1 }, 'string', 123, { item_name: 'test' }];

      const expected = [{ userId: 1 }, 'string', 123, { itemName: 'test' }];

      expect(mapSnakeCaseToCamelCase(input)).toEqual(expected);
    });
  });

  describe('Nested structures', () => {
    it('should handle nested objects', () => {
      const input = {
        user_id: 1,
        user_data: {
          first_name: 'John',
          last_name: 'Doe',
          address: {
            street_name: 'Main St',
            city_name: 'New York',
          },
        },
      };

      const expected = {
        userId: 1,
        userData: {
          firstName: 'John',
          lastName: 'Doe',
          address: {
            streetName: 'Main St',
            cityName: 'New York',
          },
        },
      };

      expect(mapSnakeCaseToCamelCase(input)).toEqual(expected);
    });

    it('should handle nested arrays', () => {
      const input = {
        users: [
          {
            user_id: 1,
            posts: [
              { post_id: 1, post_title: 'First Post' },
              { post_id: 2, post_title: 'Second Post' },
            ],
          },
        ],
      };

      const expected = {
        users: [
          {
            userId: 1,
            posts: [
              { postId: 1, postTitle: 'First Post' },
              { postId: 2, postTitle: 'Second Post' },
            ],
          },
        ],
      };

      expect(mapSnakeCaseToCamelCase(input)).toEqual(expected);
    });

    it('should handle complex nested structure', () => {
      const input = {
        api_response: {
          status_code: 200,
          data: [
            {
              user_id: 1,
              profile_info: {
                first_name: 'John',
                last_name: 'Doe',
                contact_details: {
                  email_address: 'john@example.com',
                  phone_number: '123-456-7890',
                },
              },
              posts: [{ post_id: 1, post_content: 'Hello world' }],
            },
          ],
        },
      };

      const expected = {
        apiResponse: {
          statusCode: 200,
          data: [
            {
              userId: 1,
              profileInfo: {
                firstName: 'John',
                lastName: 'Doe',
                contactDetails: {
                  emailAddress: 'john@example.com',
                  phoneNumber: '123-456-7890',
                },
              },
              posts: [{ postId: 1, postContent: 'Hello world' }],
            },
          ],
        },
      };

      expect(mapSnakeCaseToCamelCase(input)).toEqual(expected);
    });
  });

  describe('Edge cases', () => {
    it('should handle null values', () => {
      const input = {
        user_id: null,
        user_data: {
          first_name: null,
        },
      };

      const expected = {
        userId: null,
        userData: {
          firstName: null,
        },
      };

      expect(mapSnakeCaseToCamelCase(input)).toEqual(expected);
    });

    it('should handle undefined values', () => {
      const input = {
        user_id: undefined,
        user_data: {
          first_name: undefined,
        },
      };

      const expected = {
        userId: undefined,
        userData: {
          firstName: undefined,
        },
      };

      expect(mapSnakeCaseToCamelCase(input)).toEqual(expected);
    });

    it('should handle primitive values', () => {
      expect(mapSnakeCaseToCamelCase('string')).toBe('string');
      expect(mapSnakeCaseToCamelCase(123)).toBe(123);
      expect(mapSnakeCaseToCamelCase(true)).toBe(true);
      expect(mapSnakeCaseToCamelCase(false)).toBe(false);
      expect(mapSnakeCaseToCamelCase(null)).toBe(null);
    });

    it('should handle Date objects', () => {
      const date = new Date('2023-01-01');
      const input = {
        created_at: date,
        user_data: {
          last_login: date,
        },
      };

      const expected = {
        createdAt: date,
        userData: {
          lastLogin: date,
        },
      };

      expect(mapSnakeCaseToCamelCase(input)).toEqual(expected);
    });

    it('should handle keys with multiple underscores', () => {
      const input = {
        user_id_number: 1,
        api_response_data: {
          status_code_value: 200,
        },
      };

      const expected = {
        userIdNumber: 1,
        apiResponseData: {
          statusCodeValue: 200,
        },
      };

      expect(mapSnakeCaseToCamelCase(input)).toEqual(expected);
    });

    it('should handle keys starting with underscore', () => {
      const input = {
        _user_id: 1,
        _internal_data: {
          _temp_value: 'test',
        },
      };

      const expected = {
        _userId: 1,
        _internalData: {
          _tempValue: 'test',
        },
      };

      expect(mapSnakeCaseToCamelCase(input)).toEqual(expected);
    });
  });

  describe('Immutability', () => {
    it('should not mutate the original object', () => {
      const input = {
        user_id: 1,
        first_name: 'John',
      };

      const originalInput = { ...input };
      mapSnakeCaseToCamelCase(input);

      expect(input).toEqual(originalInput);
    });

    it('should not mutate the original array', () => {
      const input = [{ user_id: 1, first_name: 'John' }];

      const originalInput = JSON.parse(JSON.stringify(input));
      mapSnakeCaseToCamelCase(input);

      expect(input).toEqual(originalInput);
    });
  });
});
