import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';
import moment from 'moment';
import { MESSAGES } from '../utils/constants/message';
import { boolean } from 'joi';

export const unauthorizedResponse = (
  description = 'Unauthorized',
  message = 'Unauthorized access',
): ApiResponseOptions => ({
  status: HttpStatus.UNAUTHORIZED,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.UNAUTHORIZED,
      message,
      data: null,
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const badRequestResponse = (
  description = 'Bad Request',
  message = 'Invalid request data',
): ApiResponseOptions => ({
  status: HttpStatus.BAD_REQUEST,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.BAD_REQUEST,
      message,
      data: null,
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const forbiddenResponse = (
  description = 'Forbidden',
): ApiResponseOptions => ({
  status: HttpStatus.FORBIDDEN,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.FORBIDDEN,
      message: 'Access forbidden',
      data: null,
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const notFoundResponse = (
  description = 'Not Found',
  message = 'Resource not found',
): ApiResponseOptions => ({
  status: HttpStatus.NOT_FOUND,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message,
      data: null,
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const internalServerErrorResponse = (
  description = 'Internal Server Error',
): ApiResponseOptions => ({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'An unexpected error occurred',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const userAuthResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.LOGIN,
): ApiResponseOptions => ({
  status: HttpStatus.CREATED,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.CREATED,
      message: description,
      data: {
        id: '656b0bbd3b0e9defe34fca1a',
        email: 'john@gmail.com',
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRiZTBhZDJlNDNkMjQ2NDM5NGZlZWRiIiwidG9rZW5fdHlwZSI6MCwidmVyaWZ5IjoxLCJpYXQiOjE2OTEzODMyMjYsImV4cCI6MTY5MTQ2OTYyNn0.HTLX20cB7_z0c9c8FDg3MIx6RJEELHHlmJNZa94ku-o',
        refresh_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRiZTBhZDJlNDNkMjQ2NDM5NGZlZWRiIiwidG9rZW5fdHlwZSI6MCwidmVyaWZ5IjoxLCJpYXQiOjE2OTEzODMyMjYsImV4cCI6MTY5MTQ2OTYyNn0.HTLX20cB7_z0c9c8FDg3MIx6RJEELHHlmJNZa94ku-o',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const uploadImageResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.USER.UPLOAD_IMAGE,
): ApiResponseOptions => ({
  status: HttpStatus.CREATED,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.CREATED,
      message: description,
      data: {
        url: 'https://res.cloudinary.com/demo/image/upload/v161616616/avatar.jpg',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const createBannerResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.BANNER.INSERT,
): ApiResponseOptions => ({
  status: HttpStatus.CREATED,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.CREATED,
      message: description,
      data: {
        id: 'number',
        name: 'string',
        slug: 'string',
        url: 'string',
        link: 'string',
        description: 'string',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const updateBannerResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.BANNER.UPDATE,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        id: 'number',
        name: 'string',
        slug: 'string',
        url: 'string',
        link: 'string',
        description: 'string',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const deleteBannerResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.BANNER.DELETE,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getAllBannerResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.BANNER.GET_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: [
        {
          id: 'number',
          name: 'string',
          slug: 'string',
          url: 'string',
          link: 'string',
          description: 'string',
        },
      ],
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getBannerByIdResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.BANNER.GET_BY_ID,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        id: 'number',
        name: 'string',
        slug: 'string',
        url: 'string',
        link: 'string',
        description: 'string',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getAllBannerPaginationResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.BANNER.GET_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        items: [
          {
            id: 'number',
            name: 'string',
            slug: 'string',
            url: 'string',
            link: 'string',
            description: 'string',
          },
        ],
        page: 1,
        per_page: 5,
        total_page: 10,
        total_items: 20,
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const deleteMulBannerResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.BANNER.DELETE_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

// MENU
export const getAllMenuResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.MENU.GET_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: [
        {
          menu_id: 'number',
          name: 'string',
          image: 'string',
          parent_id: 'number',
        },
      ],
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getAllMenuPaginationResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.MENU.GET_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        items: [
          {
            id: 'number',
            name: 'string',
            slug: 'string',
            url: 'string',
            link: 'string',
            description: 'string',
          },
        ],
        page: 1,
        per_page: 5,
        total_page: 10,
        total_items: 20,
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getMenuByIdResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.MENU.GET_BY_ID,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        menu_id: 'number',
        name: 'string',
        image: 'string',
        parent_id: 'number',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const createMenuResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.MENU.INSERT,
): ApiResponseOptions => ({
  status: HttpStatus.CREATED,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.CREATED,
      message: description,
      data: {
        menu_id: 'number',
        name: 'string',
        image: 'string',
        parent_id: 'number',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const updateMenuResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.MENU.UPDATE,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        menu_id: 'number',
        name: 'string',
        image: 'string',
        parent_id: 'number',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const deleteMenuResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.MENU.DELETE,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const deleteMulMenuResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.MENU.DELETE_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

// PARTNER
export const getAllPartnerResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.PARTNER.GET_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: [
        {
          partner_id: 'number',
          partner_name: 'string',
          service_fee: 'number',
        },
      ],
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getAllPartnerPaginationResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.PARTNER.GET_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        items: [
          {
            partner_id: 'number',
            partner_name: 'string',
            service_fee: 'number',
          },
        ],
        page: 1,
        per_page: 5,
        total_page: 10,
        total_items: 20,
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getPartnerByIdResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.PARTNER.GET_BY_ID,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        partner_id: 'number',
        partner_name: 'string',
        service_fee: 'number',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const createPartnerResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.PARTNER.INSERT,
): ApiResponseOptions => ({
  status: HttpStatus.CREATED,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.CREATED,
      message: description,
      data: {
        partner_id: 'number',
        partner_name: 'string',
        service_fee: 'number',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const updatePartnerResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.PARTNER.UPDATE,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        partner_id: 'number',
        partner_name: 'string',
        service_fee: 'number',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const deletePartnerResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.PARTNER.DELETE,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const deleteMulPartnerResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.PARTNER.DELETE_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

// STORE
export const getAllStoreResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.STORE.GET_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: [
        {
          store_id: 'number',
          store_name: 'string',
          description: 'string',
          address: 'string',
          images: 'string',
          phone: 'string',
          email: 'string',
          website: 'string',
          opening_hours: 'string',
          closing_hours: 'string',
          rating: 'number',
        },
      ],
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getAllStorePaginationResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.STORE.GET_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        items: [
          {
            store_id: 'number',
            store_name: 'string',
            description: 'string',
            address: 'string',
            images: 'string',
            phone: 'string',
            email: 'string',
            website: 'string',
            opening_hours: 'string',
            closing_hours: 'string',
            rating: 'number',
          },
        ],
        page: 1,
        per_page: 5,
        total_page: 10,
        total_items: 20,
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getStoreByIdResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.STORE.GET_BY_ID,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        pstore_id: 'number',
        store_name: 'string',
        description: 'string',
        address: 'string',
        images: 'string',
        phone: 'string',
        email: 'string',
        website: 'string',
        opening_hours: 'string',
        closing_hours: 'string',
        rating: 'number',
        created_at: '2024-06-22T00:00:00.000Z',
        updated_at: '2024-06-22T00:00:00.000Z',
        is_removed: false,
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const createStoreResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.STORE.INSERT,
): ApiResponseOptions => ({
  status: HttpStatus.CREATED,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.CREATED,
      message: description,
      data: {
        store_id: 'number',
        store_name: 'string',
        description: 'string',
        address: 'string',
        images: 'string',
        phone: 'string',
        email: 'string',
        website: 'string',
        opening_hours: 'string',
        closing_hours: 'string',
        rating: 'number',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const updateStoreResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.STORE.UPDATE,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        store_id: 'number',
        store_name: 'string',
        description: 'string',
        address: 'string',
        images: 'string',
        phone: 'string',
        email: 'string',
        website: 'string',
        opening_hours: 'string',
        closing_hours: 'string',
        rating: 'number',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const deleteStoreResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.STORE.DELETE,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const deleteMulStoreResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.STORE.DELETE_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

// PROMOTIONS
export const getAllPromotionResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.PROMOTION.GET_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: [
        {
          promotion_id: 'number',
          discount: 'number',
          description: 'string',
          start_at: 'string',
          end_at: 'string',
        },
      ],
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getAllPromotionPaginationResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.PROMOTION.GET_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        items: [
          {
            promotion_id: 'number',
            discount: 'number',
            description: 'string',
            start_at: 'string',
            end_at: 'string',
          },
        ],
        page: 1,
        per_page: 5,
        total_page: 10,
        total_items: 20,
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getPromotionByIdResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.PROMOTION.GET_BY_ID,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        promotion_id: 'number',
        discount: 'number',
        description: 'string',
        start_at: 'string',
        end_at: 'string',
        created_at: 'string',
        update_at: 'string',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const createPromotionResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.PROMOTION.INSERT,
): ApiResponseOptions => ({
  status: HttpStatus.CREATED,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.CREATED,
      message: description,
      data: {
        promotion_id: 'number',
        discount: 'number',
        description: 'string',
        start_at: 'string',
        end_at: 'string',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const updatePromotionResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.PROMOTION.UPDATE,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        promotion_id: 'number',
        discount: 'number',
        description: 'string',
        start_at: 'string',
        end_at: 'string',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const deletePromotionResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.PROMOTION.DELETE,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const deleteMulPromotionResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.PROMOTION.DELETE_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

// VOUCHERS
export const getAllVoucherResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.VOUCHER.GET_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: [
        {
          voucher_id: 'number',
          code: 'string',
          discount: 'number',
          expiration: 'string',
          created_at: 'string',
          updated_at: 'string',
        },
      ],
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getAllVoucherPaginationResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.VOUCHER.GET_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        items: [
          {
            voucher_id: 'number',
            code: 'string',
            discount: 'number',
            expiration: 'string',
            created_at: 'string',
            updated_at: 'string',
          },
        ],
        page: 1,
        per_page: 5,
        total_page: 10,
        total_items: 20,
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getVoucherByIdResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.VOUCHER.GET_BY_ID,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        voucher_id: 'number',
        code: 'string',
        discount: 'number',
        expiration: 'string',
        created_at: 'string',
        updated_at: 'string',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const createVoucherResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.VOUCHER.INSERT,
): ApiResponseOptions => ({
  status: HttpStatus.CREATED,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.CREATED,
      message: description,
      data: {
        voucher_id: 'number',
        code: 'string',
        discount: 'number',
        expiration: 'string',
        created_at: 'string',
        updated_at: 'string',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const updateVoucherResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.VOUCHER.UPDATE,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        voucher_id: 'number',
        code: 'string',
        discount: 'number',
        expiration: 'string',
        created_at: 'string',
        updated_at: 'string',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const deleteVoucherResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.VOUCHER.DELETE,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const deleteMulVoucherResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.VOUCHER.DELETE_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

// FOOD
export const getAllFoodResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.FOOD.GET_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: [
        {
          food_id: 'number',
          name: 'string',
          slug: 'string',
          price: 'number',
          description: 'string',
          store_id: 'number',
          promotion_id: 'number',
          stock_quantity: 'number',
          is_available: 'boolean',
        },
      ],
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getAllFoodPaginationResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.FOOD.GET_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        items: [
          {
            food_id: 'number',
            name: 'string',
            slug: 'string',
            price: 'number',
            description: 'string',
            store_id: 'number',
            promotion_id: 'number',
            stock_quantity: 'number',
            is_available: 'boolean',
          },
        ],
        page: 1,
        per_page: 5,
        total_page: 10,
        total_items: 20,
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getFoodByIdResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.FOOD.GET_BY_ID,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        food_id: 'number',
        name: 'string',
        slug: 'string',
        price: 'number',
        description: 'string',
        store_id: 'number',
        promotion_id: 'number',
        stock_quantity: 'number',
        is_available: 'boolean',
        created_at: '2024-06-22T00:00:00.000Z',
        updated_at: '2024-06-22T00:00:00.000Z',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const createFoodResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.FOOD.INSERT,
): ApiResponseOptions => ({
  status: HttpStatus.CREATED,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.CREATED,
      message: description,
      data: {
        food_id: 'number',
        name: 'string',
        slug: 'string',
        price: 'number',
        description: 'string',
        store_id: 'number',
        promotion_id: 'number',
        stock_quantity: 'number',
        is_available: 'boolean',
        created_at: '2024-06-22T00:00:00.000Z',
        updated_at: '2024-06-22T00:00:00.000Z',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const updateFoodResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.FOOD.UPDATE,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        food_id: 'number',
        name: 'string',
        slug: 'string',
        price: 'number',
        description: 'string',
        store_id: 'number',
        promotion_id: 'number',
        stock_quantity: 'number',
        is_available: 'boolean',
        created_at: '2024-06-22T00:00:00.000Z',
        updated_at: '2024-06-22T00:00:00.000Z',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const deleteFoodResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.FOOD.DELETE,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const deleteMulFoodResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.FOOD.DELETE_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const addImageProdResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.FOOD.ADD_IMG_TO_PROD,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const updateImageProdResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.FOOD.UPDATE_IMG_TO_PROD,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getAllImageProdResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.FOOD.GET_ALL_IMG_TO_PROD,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const likeProdResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.FOOD.LIKE,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const unLikeProdResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.FOOD.UNLIKE,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const addMenuProdResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.MENU.ADD_FOOD,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getProdToMenuResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.MENU.GET_PRODUCT,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        menu_id: 'string',
        food_id: 'string',
        Foods: {
          food_id: 'number',
          name: 'string',
          slug: 'string',
          price: 'number',
          description: 'string',
          is_available: true,
          store_id: 'number',
          promotion_id: 'number',
          tags: 'string',
          stock_quantity: 'number',
          is_removed: false,
          created_at: '2024-11-02T12:59:16.215Z',
          updated_at: '2024-11-02T13:33:59.123Z',
        },
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const deleteMenuProdResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.MENU.REMOVE_FOOD,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});
// VOUCHERS
export const getCartResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.CART.GET_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: [
        {
          user_id: 'number',
          food_id: 'string',
          quantity: 'number',
          created_at: 'string',
          updated_at: 'string',
        },
      ],
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getCartPaginationResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.CART.GET_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        items: [
          {
            user_id: 'number',
            food_id: 'string',
            quantity: 'number',
            created_at: 'string',
            updated_at: 'string',
          },
        ],
        page: 1,
        per_page: 5,
        total_page: 10,
        total_items: 20,
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const createCartResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.CART.INSERT,
): ApiResponseOptions => ({
  status: HttpStatus.CREATED,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.CREATED,
      message: description,
      data: {
        user_id: 'number',
        food_id: 'string',
        quantity: 'number',
        created_at: 'string',
        updated_at: 'string',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const updateCartResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.CART.UPDATE,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        user_id: 'number',
        food_id: 'string',
        quantity: 'number',
        created_at: 'string',
        updated_at: 'string',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const deleteCartResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.CART.DELETE,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const deleteMulCartResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.CART.DELETE_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getWishListPaginationResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.WISHLIST.GET_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        items: [
          {
            food_id: 'number',
            name: 'string',
            slug: 'string',
            price: 'number',
            description: 'string',
            store_id: 'number',
            promotion_id: 'number',
            stock_quantity: 'number',
            is_available: 'boolean',
          },
        ],
        page: 1,
        per_page: 5,
        total_page: 10,
        total_items: 20,
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getWishListResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.WISHLIST.GET_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: [
        {
          food_id: 'number',
          name: 'string',
          slug: 'string',
          price: 'number',
          description: 'string',
          store_id: 'number',
          promotion_id: 'number',
          stock_quantity: 'number',
          is_available: 'boolean',
        },
      ],
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

// ORDER RESPONSES
export const getAllOrderResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.ORDER.GET_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: [
        {
          order_id: 'number',
          user_id: 'string',
          store_id: 'number',
          address_id: 'number',
          voucher_id: 'number',
          method_id: 'number',
          message: 'string',
          total_discount: 'number',
          total_price: 'number',
          service_fee: 'number',
          shipping_price: 'number',
          status: 'string',
          is_removed: 'boolean',
          created_at: '2024-06-22T00:00:00.000Z',
          updated_at: '2024-06-22T00:00:00.000Z',
          order_foods: [
            {
              food_id: 'number',
              quantity: 'number',
              discount_at_order: 'number',
              price_at_time_of_order: 'number',
            },
          ],
        },
      ],
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getAllOrderPaginationResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.ORDER.GET_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        items: [
          {
            order_id: 'number',
            user_id: 'string',
            store_id: 'number',
            address_id: 'number',
            voucher_id: 'number',
            method_id: 'number',
            message: 'string',
            total_discount: 'number',
            total_price: 'number',
            service_fee: 'number',
            shipping_price: 'number',
            status: 'string',
            is_removed: 'boolean',
            created_at: '2024-06-22T00:00:00.000Z',
            updated_at: '2024-06-22T00:00:00.000Z',
            order_foods: [
              {
                food_id: 'number',
                quantity: 'number',
                discount_at_order: 'number',
                price_at_time_of_order: 'number',
              },
            ],
          },
        ],
        page: 1,
        per_page: 5,
        total_page: 10,
        total_items: 20,
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const getOrderByIdResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.ORDER.GET_BY_ID,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        order_id: 'number',
        user_id: 'string',
        store_id: 'number',
        address_id: 'number',
        voucher_id: 'number',
        method_id: 'number',
        message: 'string',
        total_discount: 'number',
        total_price: 'number',
        service_fee: 'number',
        shipping_price: 'number',
        status: 'string',
        is_removed: 'boolean',
        created_at: '2024-06-22T00:00:00.000Z',
        updated_at: '2024-06-22T00:00:00.000Z',
        order_foods: [
          {
            food_id: 'number',
            quantity: 'number',
            discount_at_order: 'number',
            price_at_time_of_order: 'number',
          },
        ],
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const createOrderResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.ORDER.INSERT,
): ApiResponseOptions => ({
  status: HttpStatus.CREATED,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.CREATED,
      message: description,
      data: {
        order_id: 'number',
        user_id: 'string',
        store_id: 'number',
        address_id: 'number',
        voucher_id: 'number',
        method_id: 'number',
        message: 'string',
        total_discount: 'number',
        total_price: 'number',
        service_fee: 'number',
        shipping_price: 'number',
        status: 'string',
        order_foods: [
          {
            food_id: 'number',
            quantity: 'number',
            discount_at_order: 'number',
            price_at_time_of_order: 'number',
          },
        ],
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const updateOrderResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.ORDER.UPDATE,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        order_id: 'number',
        status: 'string',
        updated_at: '2024-06-22T00:00:00.000Z',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const deleteOrderResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.ORDER.CANCELLED,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        message: 'Order with ID {id} has been removed',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const deleteMulOrderResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.ORDER.CANCELLED_ALL,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        deletedIds: ['number'],
        notFoundIds: ['number'],
        duplicateIds: ['number'],
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const createAddressResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.ADDRESS.INSERT,
): ApiResponseOptions => ({
  status: HttpStatus.CREATED,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.CREATED,
      message: description,
      data: {
        address_id: 'number',
        user_id: 'string',
        address_line1: 'string',
        address_line2: 'string',
        city: 'string',
        postal_code: 'string',
        address_type: 'string',
        latitude: 40.712776,
        longitude: -74.005974,
        is_removed: false,
        created_at: '2024-06-22T00:00:00.000Z',
        updated_at: '2024-06-22T00:00:00.000Z',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});

export const updateAddressResponse = (
  description = MESSAGES.SUCCESS_MESSAGES.ADDRESS.UPDATE,
): ApiResponseOptions => ({
  status: HttpStatus.OK,
  description,
  schema: {
    example: {
      statusCode: HttpStatus.OK,
      message: description,
      data: {
        address_id: 'number',
        user_id: 'string',
        address_line1: 'string',
        address_line2: 'string',
        city: 'string',
        postal_code: 'string',
        address_type: 'string',
        latitude: 40.712776,
        longitude: -74.005974,
        is_removed: false,
        updated_at: '2024-06-22T00:00:00.000Z',
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    },
  },
});
