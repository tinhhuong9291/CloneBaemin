export const MESSAGES = {
  DATABASE: {
    CONNECT_SUCCESS: '🌱 Successfully connected to the database.',
    DISCONNECT_SUCCESS: '⛔️ Successfully disconnected from the database.',
    USERNAME: 'Username credentials to access the database main',
    PASSWORD: 'Password credentials to access the database main ',
  },
  AUTH: {
    OTP: {
      NAME: 'Gmail account display name for OTP.',
      ACCOUNT: 'Gmail account email for OTP.',
      PASSWORD: 'Gmail account password for OTP.',
    },
    JWT: {
      SECRET_KEY: 'Unique secret string for JWT, stored securely.',
      REFRESH_TOKEN_KEY: 'Unique refresh token secret string, stored securely.',
      EXPIRATION: {
        ACCESS_TOKEN: 'Access token expiration duration.',
        REFRESH_TOKEN: 'Refresh token expiration duration.',
      },
      ALGORITHM: 'List of allowed JWT algorithms.',
      OTP_SECRET: 'Security string for OTP.',
    },
  },
  ENVIRONMENT: {
    PORT: 'Server port.',
    HOST: 'Server host.',
    DEV: 'Environment is a collection of procedures and tools for developing, testing and debugging an application or program.',
    PROD: 'Environment contains just the final version of the product in order to avoid any confusion or security vulnerabilities',
    TEST: 'Testing environment setup.',
  },
  CLIENT: {
    REQUEST: {
      POINT: 'Maximum points consumable over duration.',
      DURATION: 'Seconds before points reset.',
      PASSWORD_SECRET: 'Security string for passwords.',
      OTP_SECRET: 'Security string for OTP.',
      COOKIE_EXPIRATION: 'Cookie expiration duration.',
      SECRET_COOKIE_NAME: 'Cookie name for successful login/register.',
      PATHS: {
        PROVINCE_JSON: 'Path to province.json file.',
        OPENAPI_YAML: 'Path to paths.yaml file.',
      },
      SERVER_URL: 'Backend URL.',
    },
  },
  ERROR_MESSAGES: {
    AUTH: {
      LOGIN: 'Login process failed',
      REGISTER: 'Registration process failed',
      LOGOUT: 'Logout process failed',
      PERMISSION: 'Insufficient permissions to access resource.',
    },
    ROLE: {
      GET_ALL_ROLE: 'Failed to retrieve users role',
      GET_ROLE_USER: 'Retrieving users by role failed',
    },
    OTP: {
      FIND_OTP: 'Failed to find OTP',
      GENERATED_OTP: 'OTP generation failed',
      VERIFY_OTP: 'OTP verification failed',
      SEND_FAILURE: 'OTP sending failed',
    },
    USER: {
      GET_ALL_USER: 'Failed to retrieve users',
      CHANGE_PASSWORD: 'Password change failed',
      FORGOT_PASSWORD: 'Forgot-password process failed',
      VERIFY_FORGOT_PASSWORD_TOKEN: 'Forgot-password token verification failed',
    },
    BANNER: {
      GET_ALL: 'An error occurred while trying to get all banners',
      PAGINATION:
        'An error occurred while trying to get all banners using pagination',
      INSERT: 'An error occurred while trying to insert banner',
      GET_BY_ID: 'An error occurred while trying to get banner by id',
      UPDATE: 'An error occurred while trying to update a banner',
      DELETED: 'An error occurred while trying to delete a banner',
      DELETED_ALL: 'An error occurred while trying to delete banners',
    },
    MENU: {
      GET_ALL: 'An error occurred while trying to get all menu',
      PAGINATION:
        'An error occurred while trying to get all menu using pagination',
      INSERT: 'An error occurred while trying to insert menu',
      GET_BY_ID: 'An error occurred while trying to get menu by id',
      UPDATE: 'An error occurred while trying to update a menu',
      DELETED: 'An error occurred while trying to delete a menu',
      DELETED_ALL: 'An error occurred while trying to delete menu',
    },
    PARTNER: {
      GET_ALL: 'An error occurred while trying to get all partner',
      PAGINATION:
        'An error occurred while trying to get all partner using pagination',
      INSERT: 'An error occurred while trying to insert partner',
      GET_BY_ID: 'An error occurred while trying to get partner by id',
      UPDATE: 'An error occurred while trying to update a partner',
      DELETED: 'An error occurred while trying to delete a partner',
      DELETED_ALL: 'An error occurred while trying to delete partner',
    },
    STORE: {
      GET_ALL: 'An error occurred while trying to get all store',
      PAGINATION:
        'An error occurred while trying to get all store using pagination',
      INSERT: 'An error occurred while trying to insert store',
      GET_BY_ID: 'An error occurred while trying to get store by id',
      UPDATE: 'An error occurred while trying to update a store',
      DELETED: 'An error occurred while trying to delete a store',
      DELETED_ALL: 'An error occurred while trying to delete store',
    },
    ADDRESS: {
      NOT_FOUND: 'Address not found.',
      INSERT_FAILED: 'Failed to create address.',
      UPDATE_FAILED: 'Failed to update address.',
      DELETE_FAILED: 'Failed to delete address.',
      INVALID_DATA: 'Invalid address data provided.',
    },
  },
  SUCCESS_MESSAGES: {
    LOGIN: 'Login successfully.',
    REGISTER: 'Registration successfully.',
    LOGOUT: 'Logout successfully.',
    CONFIRM: 'Email confirmed successfully',
    RESEND_LINK: 'Confirmed link had sent successfully',
    DATA_RETRIEVAL: 'Data retrieval successfully.',
    DATA_MANIPULATION: 'Data manipulation successfully.',
    OTP: {
      VERIFY: 'OTP verification successfully.',
      RESEND: 'OTP resend successfully.',
    },
    AUTH: {
      GET_ALL: 'Get all user successfully',
      GET_BY_ID: 'Get user profile details by admin successfully',
      UPDATE: 'Successfully update user account',
      INSERT: 'Successfully create user account',
      DELETE: 'Successfully deleted user account(s) ',
      GET_ROLES: 'All user role retrieved successfully.',
      GET_ROLE_BY_ID: 'Get user profile details by admin successfully',
      UPDATE_ROLE: 'Successfully update role user',
      DELETE_ROLE: 'Successfully deleted role user',
      RESET_PASSWORD: 'Reset password successfully.',
      LOGOUT: 'Logout successfully',
      ROLE: {
        UPDATE: 'Update user role successfully',
      },
    },
    ORDER: {
      GET_ALL: 'Get all order successfully',
      GET_BY_ID: 'Get order details by user successfully',
      UPDATE: 'Update order successfully',
      INSERT: 'Insert order successfully',
      CANCELLED: 'Canceled order successfully',
      CANCELLED_ALL: 'Canceled all order successfully',
      INSERT_NOTES: 'Insert order notes successfully',
      GET_ALL_ORDER_NOTES: 'Get all order notes successfully',
    },
    USER: {
      REFRESH_TOKEN: 'Token refreshed successfully.',
      FORGOT_PASSWORD: 'Forgot password request processed successfully.',
      VERIFY_FORGOT_PASSWORD: 'Forgot password verified successfully.',
      RESET_PASSWORD: 'Password reset successfully.',
      CHANGE_PASSWORD: 'Password changed successfully.',
      GET_LIST_ORDER_BY_USER: 'Get list orders by user successfully!',
      GET_ALL: 'All users retrieved successfully.',
      GET_BY_ID: 'User retrieved successfully.',
      GET_PROFILE: 'Profile fetched successfully.',
      UPDATE: 'Updated successfully.',
      SEARCH: 'User search completed successfully.',
      DELETE: 'User deleted successfully.',
      DELETE_MANY_USER: 'Multiple users deleted successfully.',
      GET_ROLE: 'User roles retrieved successfully.',
      EDIT_ROLE: 'User roles edited successfully.',
      GET_FAVORITE_FRIEND: 'List of close friends retrieved successfully.',
      PAGINATION: 'User pagination executed successfully.',
      TEST_TOKEN: 'Token test completed successfully.',
      GET_PRODUCT_FAVORITE: 'Favorite products retrieved successfully.',
      UPLOAD_AVATAR: 'Avatar uploaded successfully.',
      UPLOAD_THUMBNAIL: 'Thumbnail uploaded successfully.',
      UPLOAD_IMAGE: 'Image uploaded successfully.',
      UPLOAD_MUL_IMAGE: 'Multiple images were uploaded successfully.',
      GET_BOOKING_HISTORY: 'Get booking history successfully.',
    },
    COMMENTS: {
      GET_ALL: 'Successfully retrieved all comments by product',
      GET_BY_ID: 'Successfully get comment by comment_id',
      INSERT: 'Successfully inserted comment.',
      UPDATE: 'Successfully updated comment.',
      DELETE: 'Successfully deleted comment.',
      REPLIES: 'Replies comment successfully',
      LIKE: 'Like comment successfully.',
      UNLIKE: 'Unlike comment successfully.',
    },
    CATEGORY: {
      GET_ALL: 'Successfully retrieved all categories.',
      GET_BY_ID: 'Successfully retrieved categories by category_id.',
      INSERT: 'Successfully inserted category.',
      UPDATE: 'Successfully updated category.',
      DELETE: 'Successfully deleted category.',
      SEARCH: 'Search categories successfully!',
      GET_PRODUCTS_BY_CATEGORY: 'Get list of product by category successfully',
      GET_LIST_OF_SUB_CATEGORY: 'Get list of sub_categories successfully!',
    },
    BLOGS: {
      GET_ALL: 'Successfully retrieved all blog.',
      GET_BY_ID: 'Successfully retrieved blog by blog_id.',
      INSERT: 'Successfully inserted blog.',
      UPDATE: 'Successfully updated blog.',
      DELETE: 'Successfully deleted blog.',
      SEARCH: 'Search blog successfully!',
      GET_COMMENT: 'Successfully get comment by comment_id',
      INSERT_COMMENT: 'Successfully inserted comment.',
      RE_COMMENT: 'Successfully deleted comment.',
      LIKE: 'Like comment successfully.',
      UNLIKE: 'Unlike comment successfully.',
    },
    IMAGE: {
      GET_ALL: 'Successfully retrieved all images.',
      GET_BY_ID: 'Get detail image by image_id',
      CLEAR: 'Clear all image successfully',
      DELETE: 'Successfully deleted image',
      UPLOAD_IMAGE: 'Image uploaded successfully.',
      UPLOAD_MUL_IMAGE: 'Multiple images were uploaded successfully.',
    },
    CART: {
      GET_ALL: 'Cart items retrieved successfully',
      INSERT: 'Product added to cart successfully',
      UPDATE: 'Cart item updated successfully',
      DELETE: 'Product removed from cart successfully',
      DELETE_ALL: 'Removed multiple product from cart successfully',
      CHECkOUT: 'Checkout process successfully!',
    },
    ADDRESS: {
      INSERT: 'Address created successfully.',
      UPDATE: 'Address updated successfully.',
      DELETE: 'Address deleted successfully.',
      GET_ALL: 'All addresses retrieved successfully.',
      GET_BY_ID: 'Address retrieved successfully.',
    },
    BANNER: {
      GET_ALL: 'Successfully retrieved all banners in database.',
      GET_BY_ID: 'Successfully get banner by id',
      INSERT: 'Successfully inserted banner',
      UPDATE: 'Successfully updated banner',
      DELETE: 'Successfully deleted banner',
      DELETE_ALL: 'Successfully deleted all banner',
    },
    VOUCHER: {
      GET_ALL: 'Successfully retrieved all vouchers in database.',
      GET_BY_ID: 'Successfully get voucher by id',
      INSERT: 'Successfully inserted voucher',
      UPDATE: 'Successfully updated voucher',
      DELETE: 'Successfully deleted voucher',
      DELETE_ALL: 'Successfully deleted all voucher',
    },
    MENU: {
      GET_ALL: 'Successfully retrieved all menu in database.',
      GET_BY_ID: 'Successfully get menu by id',
      INSERT: 'Successfully inserted menu',
      UPDATE: 'Successfully updated menu',
      DELETE: 'Successfully deleted menu',
      DELETE_ALL: 'Successfully deleted all menu',
      ADD_FOOD: 'Food item added to the menu successfully',
      REMOVE_FOOD: 'Food item removed from the menu successfully',
      GET_PRODUCT: 'List of food items in the menu',
    },
    PARTNER: {
      GET_ALL: 'Successfully retrieved all shipping partner in database.',
      GET_BY_ID: 'Successfully get shipping partner by id',
      INSERT: 'Successfully inserted shipping partner',
      UPDATE: 'Successfully updated shipping partner',
      DELETE: 'Successfully deleted shipping partner',
      DELETE_ALL: 'Successfully deleted all shipping partner',
    },
    STORE: {
      GET_ALL: 'Successfully retrieved all shipping store in database.',
      GET_BY_ID: 'Successfully get shipping store by id',
      INSERT: 'Successfully inserted shipping store',
      UPDATE: 'Successfully updated shipping store',
      DELETE: 'Successfully deleted shipping store',
      DELETE_ALL: 'Successfully deleted all shipping store',
    },
    PROMOTION: {
      GET_ALL: 'Successfully retrieved all promotions in database.',
      GET_BY_ID: 'Successfully get promotion by id',
      INSERT: 'Successfully inserted promotion',
      UPDATE: 'Successfully updated promotion',
      DELETE: 'Successfully deleted promotion',
      DELETE_ALL: 'Successfully deleted all promotion',
    },
    WISHLIST: {
      GET_ALL: 'Successfully retrieved all foods in database.',
    },
    FOOD: {
      GET_ALL: 'All products have been successfully retrieved.',
      SEARCH: 'Search products have been successfully',
      GET_BY_ID: 'The product was successfully retrieved using the ID.',
      INSERT: 'Product successfully inserted.',
      UPDATE: 'Product update successful.',
      DELETE: 'The product has been successfully deleted.',
      DELETE_ALL: 'List of product has been successfully deleted.',
      GET_PROD_BY_MENU: 'Retrieve products based on their menu.',
      GET_ALL_PROD_FAVORITE: 'Successfully obtain a list of favorite products!',
      ADD_IMG_TO_PROD: 'Add multiple images to a food item successfully',
      UPDATE_IMG_TO_PROD: 'Update image to a food item successfully',
      GET_ALL_IMG_TO_PROD: 'Get all images to product successfully',
      LIKE: 'Food added to favorites successfully',
      UNLIKE: 'Food removed from favorites successfully',
    },
  },
  VALIDATION_MESSAGES: {
    TITLE: 'Validation Errors.',
    ADDRESS: {
      ID_IS_REQUIRED: 'Address ID is required.',
      ID_MUST_BE_A_STRING: 'Address ID must be a string.',
      NOT_FOUND: 'Address not found.',
      NAME_IS_REQUIRED: 'Address name is required.',
      NAME_MUST_BE_A_STRING: 'Address name must be a string.',
      STREET_IS_REQUIRED: 'Street is required.',
      STREET_MUST_BE_A_STRING: 'Street must be a string.',
      CITY_IS_REQUIRED: 'City is required.',
      CITY_MUST_BE_A_STRING: 'City must be a string.',
      ZIP_CODE_IS_REQUIRED: 'Zip code is required.',
      ZIP_CODE_MUST_BE_A_STRING: 'Zip code must be a string.',
    },
    ORDER: {
      ADDRESS_IS_REQUIRED: 'An order address is required.',
      ADDRESS_MUST_BE_A_STRING: 'The order address must be a string.',
      ID_MUST_BE_A_STRING: 'The order ID must be a string.',
      INVALID_ORDER_ID: 'The order ID is invalid.',
      NOT_FOUND: 'Order not found.',
      STATE_MUST_BE_A_STRING: 'The order state must be a string.',
      INVALID_ORDER_STATE: 'The order state is invalid.',
      ORDER_AMOUNT_IS_INVALID: 'The order amount is invalid.',
      LIST_MUST_BE_AN_ARRAY: 'The order list must be an array.',
      SIZE_IS_NOT_EXIST_ON_PRODUCT:
        'The specified product size does not exist.',
      ORDER_STATE_MUST_BE_A_STRING: 'Order state must be a string.',
    },
    CATEGORY: {
      ID_MUST_BE_A_STRING: 'The category ID must be a string.',
      INVALID_ID: 'The category ID is invalid.',
      ID_IS_REQUIRED: 'A category ID is required.',
      NOT_FOUND: 'Category not found.',
      NAME_MUST_BE_A_STRING: 'The category name must be a string.',
      NAME_IS_REQUIRED: 'A category name is required.',
      INVALID_NAME: 'The category name is invalid.',
      IMAGE_MUST_BE_A_STRING: 'The category image must be a string.',
      IMAGE_MUST_BE_A_VALID_URL: 'The category image must be a valid URL.',
    },
    PROMOTIONS: {
      ID_IS_REQUIRED: 'A promotions ID is required.',
      INVALID_ID: 'The brand ID is invalid.',
      NOT_FOUND: 'The specified promotion does not exist.',
      DESC_IS_REQUIRED: 'A promotion description is required.',
      DESC_MUST_BE_STRING: 'The promotion description must be a string.',
      DESC_LENGTH_IS_INVALID:
        'The promotion description length must be between 4 to 100 characters.',
      INVALID_SORT_ORDER: 'The sorting order is invalid.',
      FIELD_UPDATE_IS_REQUIRED: 'At least one field must be updated.',
      START_DATE_INVALID: 'The start date is not in the correct format',
      END_DATE_INVALID: 'The end date is not in the correct format',
      DISCOUNT_IS_NUMBER: 'Discount must be a number',
      DISCOUNT_PER_MIN: 'Discount must be a positive number',
      DISCOUNT_PER_MAX: 'Discount must be less than 100',
      INVALID_DATE: 'Start date must be before end date',
    },
    VOUCHER: {
      ID_IS_REQUIRED: 'A vouchers ID is required.',
      INVALID_ID: 'The brand ID is invalid.',
      NOT_FOUND: 'The specified voucher does not exist.',

      CODE_ALREADY_EXISTS: 'This voucher code already exists.',
      CODE_IS_REQUIRED: 'A voucher code is required.',
      CODE_MUST_BE_STRING: 'The voucher code must be a string.',
      CODE_LENGTH_IS_INVALID: 'Voucher code must be exactly 8 characters long',

      INVALID_SORT_ORDER: 'The sorting order is invalid.',
      FIELD_UPDATE_IS_REQUIRED: 'At least one field must be updated.',

      EXPIRED_IS_REQUIRED: 'The expiration is required.',
      EXPIRED_INVALID: 'The expiration is not in the correct format',

      DISCOUNT_IS_REQUIRED: 'Voucher discount is required.',
      DISCOUNT_IS_NUMBER: 'Voucher discount must be a number',
      DISCOUNT_PER_MIN: 'Voucher discount must be a positive number',
      DISCOUNT_PER_MAX: 'Voucher discount must be less than 100',
    },
    BANNER: {
      ALREADY_EXITST: 'Banner with this name already exists',
      NOT_FOUND: 'Banner not found.',
      ID_INVALID: 'The banner ID is invalid.',
      ID_IS_REQUIRED: 'A banner ID is required.',
      NAME_IS_REQUIRED: 'Banner name is required.',
      NAME_MUST_BE_STRING: 'Banner name must be a string.',
      NAME_LENGTH_IS_INVALID:
        'The banner name length must be between 3 to 50 characters.',
      SLUG_IS_REQUIRED: 'A slug is required.',
      SLUG_MUST_BE_STRING: 'The slug must be a string.',
      SLUG_LENGTH_IS_INVALID:
        'The slug length must be between 10 to 50 characters.',
      INVALID_SLUG: 'The slug must be valid.',
      SLUG_INCLUDES_MULTIPLE_WHITESPACES:
        'The slug cannot contain multiple consecutive whitespaces.',
      DESCRIPTION_IS_REQUIRED: 'A description is required.',
      DESCRIPTION_MUST_BE_STRING: 'The description must be a string.',
      DESCRIPTION_LENGTH_IS_INVALID:
        'The description length must be between 6 to 300 characters.',
      URL_IS_REQUIRED: 'An image URL is required.',
      URL_MUST_BE_STRING: 'The image URL must be a string.',
      VALID_URL_IMAGE:
        'The URL must be a valid image URL and have a valid image extension.',
      LINK_IS_REQUIRED: 'Link is required.',
      LINK_MUST_BE_STRING: 'LInk must be a string.',
      VALID_LINK: 'The link is invalid',
    },
    MENU: {
      UPDATED_OWN_ID: 'Parent_id cannot update its own id',
      ALREADY_EXITST: 'Menu with this name already exists',
      NOT_FOUND: 'Menu not found.',
      ID_INVALID: 'The menu ID is invalid.',
      ID_IS_REQUIRED: 'A menu ID is required.',
      NAME_IS_REQUIRED: 'Menu name is required.',
      NAME_MUST_BE_STRING: 'Menu name must be a string.',
      NAME_LENGTH_IS_INVALID:
        'The menu name length must be between 3 to 50 characters.',
      VALID_URL_IMAGE:
        'The URL must be a valid image URL and have a valid image extension.',
      URL_IMAGE_IS_REQUIRED: 'Link is required.',
      URL_IMAGE_MUST_BE_STRING: 'Link must be a string.',
    },
    PARTNER: {
      ALREADY_EXITST: 'Partner with this name already exists',
      NOT_FOUND: 'Partner not found.',
      ID_INVALID: 'The partner ID is invalid.',
      ID_IS_REQUIRED: 'A partner ID is required.',
      NAME_IS_REQUIRED: 'Partner name is required.',
      NAME_MUST_BE_STRING: 'Partner name must be a string.',
      NAME_LENGTH_IS_INVALID:
        'The partner name length must be between 3 to 50 characters.',
      SERVICE_FEE_IS_NUMBER: 'Service fee must be a number',
      SERVICE_FEE_MIN: 'Service fee must be a positive number',
      SERVICE_FEE_MAX: 'Service fee must be less than 1,000,000',
    },
    STORE: {
      ALREADY_EXITST: 'Store with this name already exists',
      NOT_FOUND: 'Store not found.',
      ID_INVALID: 'The store ID is invalid.',
      ID_IS_REQUIRED: 'Store ID is required.',
      NAME_IS_REQUIRED: 'Store name is required.',
      NAME_MUST_BE_STRING: 'Store name must be a string.',
      NAME_LENGTH_IS_INVALID:
        'The store name length must be between 3 to 50 characters.',
      ADDRESS_IS_REQUIRED: 'Address is required.',
      ADDRESS_MUST_BE_STRING: 'Address must be a string.',
      ADDRESS_LENGTH_MUST_BETWEEN_3_TO_100_CHARACTERS:
        'Address must be between 3 and 100 characters long.',
      PHONE_IS_REQUIRED: 'Phone is required.',
      PHONE_MUST_BE_STRING: 'Phone must be a string.',
      PHONE_LENGTH_MUST_BE_10_CHARACTER: 'Phone number must be 10 digits long.',
      PHONE_IS_INVALID:
        'Invalid phone number. Please provide a valid Vietnamese phone number.',
      VALID_URL_IMAGE:
        'The URL must be a valid image URL and have a valid image extension.',
      URL_IMAGE_IS_REQUIRED: 'Image url is required.',
      URL_IMAGE_MUST_BE_STRING: 'Image url must be a string.',
      DESCRIPTION_MUST_BE_STRING: 'Description must be a string.',
      DESCRIPTION_IS_INVALID:
        'Description must be between 3 and 1000 characters long.',
      EMAIL_IS_REQUIRED: 'Email is required.',
      EMAIL_MUST_BE_A_STRING: 'Email must be a string.',
      EMAIL_INVALID: 'Invalid email address.',
      EMAIL_ACCESSIBILITY:
        'Email not found or has been removed. Please provide a valid email or register.',
      WEBSITE_MUST_BE_A_STRING: 'Website must be a string.',
      WEBSITE_LENGTH_MUST_BETWEEN_3_TO_100_CHARACTERS:
        'Website must be between 3 and 100 characters long.',
      WEBSITE_IS_INVALID: 'Invalid website URL.',
      OPENING_HOURS_IS_REQUIRED: 'Opening hours is required.',
      OPENING_HOURS_MUST_BE_STRING: 'Opening hours must be a string.',
      CLOSING_HOURS_IS_REQUIRED: 'Closing hours is required.',
      CLOSING_HOURS_MUST_BE_STRING: 'Closing hours must be a string.',
    },
    CART: {
      ALREADY_EXITST: 'Partner with this name already exists',
      NOT_FOUND: 'Partner not found.',
      PROD_ID_INVALID: 'The product ID is invalid.',
      PROD_ID_IS_REQUIRED: 'A product ID is required.',
      QUANTITY_IS_NUMBER: 'Quantity must be a number',
      QUANTITY_MIN: 'Quantity must be at least 1',
      QUANTITY_MAX: 'Quantity must be less than 50',
    },
    FOOD: {
      ID_IS_REQUIRED: 'Product ID is required.',
      ID_IS_INVALID: 'Invalid product ID.',
      NOT_FOUND: 'Product not found or removed.',
      IMAGES_ID_NOT_FOUND: 'Food image id not found',
      NOT_FOUND_IN_CART: 'Product not found in cart.',
      ALREADY_EXIST: 'Product already exists in the system.',
      NAME_IS_REQUIRED: 'Product name is required.',
      NAME_ALREADY_EXIST: 'This product name already exists.',
      NAME_IS_INVALID: 'Product name must be valid.',
      NAME_LENGTH_IS_INVALID:
        'Product name must be between 5 and 100 characters long.',
      NAME_INCLUDES_MULTIPLE_WHITESPACES:
        'Product name cannot contain multiple consecutive whitespaces.',
      PRICE_CANNOT_BE_EMPTY: 'Product price cannot be empty.',
      PRICE_IS_INVALID: 'Product price must be a number greater than 0.',
      DESCRIPTION_IS_REQUIRED: 'Product description is required.',
      DESCRIPTION_MUST_BE_STRING: 'Product description must be a string.',
      DESCRIPTION_IMG_MUST_BE_STRING: 'Product description must be a string.',
      DESCRIPTION_IS_INVALID:
        'Description must be between 1 and 1000 characters long.',
      STOCK_QUANTITY_IS_INVALID:
        'Stock quantity must be an integer between 0 and 1000.',
      STOCK_QUANTITY_IS_REQUIRED: 'Stock quantity is required.',
      STOCK_QUANTITY_MUST_BE_NUMBER: 'Stock quantity must be a number.',
      STORE_ID_INVALID: 'The store ID is invalid.',
      STORE_ID_IS_REQUIRED: 'Store ID is required.',
      STORE_NOT_FOUND: 'Store not found or removed in system.',
      STORE_MUST_BE_NUMBERIC: 'Store ID must be a number',
      PROMOTION_ID_INVALID: 'The promotion ID is invalid.',
      PROMOTION_ID_IS_REQUIRED: 'Promotion ID is required.',
      PROMOTION_NOT_FOUND: 'Promotion not found or removed in system.',
      PROMOTION_MUST_BE_NUMBERIC: 'Promotion ID must be a number',
      INVALID_SORT_ORDER: 'Invalid sorting order.',
      IMAGE_URL_IS_REQUIRED: 'Image URL is required.',
      IMAGE_URL_MUST_BE_STRING: 'Image URL must be a string.',
      IMAGE_URL_MUST_BE_JPG_OR_PNG: 'Image URL must be a .jpg or .png image.',
      VALID_IMAGE_URL_IMAGE:
        'Image URL must be valid with a correct image format.',
      IMAGE_URL_LENGTH_MUST_FROM_1_TO_100_CHARACTERS:
        'Image URL length must be between 1 and 100 characters.',
      LIKE: 'Like the successfully food ',
      UNLIKE: 'Unlike the unsuccessful food',
      FOOD_FAVORITE_ALREADY_EXIST: 'Food is already in favorites',
      FOOD_FAVORITE_NOT_ALREADY_EXIST: 'Food is not in favorites',
      FOOD_MENU_ALREADY_EXIST: 'This food item is already in the menu',
      FOOD_MENU_NOT_ALREADY_EXIST: 'This food item is not in the menu',
    },
    UPLOAD: {
      IMAGE: {
        INVALID_IMAGE_EXTENSION: 'Image extension is invalid.',
        INVALID_IMAGE_SIZE: 'Image size is too large.',
        MAX_IMAGE_UPLOAD: 'A maximum of 4 images can be uploaded.',
      },
    },
    USER: {
      COMMONS: {
        NOT_LOGIN: 'You must be logged in to continue.',
        ID_IS_INVALID: 'User ID is invalid.',
        ID_MUST_BE_A_STRING: 'User ID must be a string.',
        ID_CAN_NOT_BE_EMPTY: 'User ID cannot be empty.',
        WITH_ID_IS_NOT_EXIST: 'User with the specified ID does not exist.',
        NOT_ROLE_NOT_SATISFIED:
          'You do not have the appropriate role to access these resources.',
        INVALID_INCLUDES: 'Invalid pagination inclusion.',
        EMAIL_OR_PASSWORD_IS_INCORRECT: 'The email or password is incorrect.',
        INVALID_BEARER_TOKEN: 'The bearer token is invalid.',
        HEADER_AUTHORIZATION_IS_INVALID: 'Authorization header is invalid.',
        EMAIL: {
          IS_REQUIRED: 'Email is required.',
          MUST_BE_A_STRING: 'Email must be a string.',
          ACCESSIBILITY:
            'The email address does not exist. Please use a valid one or register.',
          NOT_REGISTER: 'Email is not registered.',
          ALREADY_EXISTS: 'User with this email already exists',
          VALID_EMAIL: 'Email address is invalid.',
          VALID_DOMAIN: 'Email must end with @gmail.com or @gmail.edu.com.',
          CONTAIN_SPECIAL_CHARACTER:
            'Email must contain at least one special character.',
        },
        FIRST_NAME: {
          INVALID: 'Invalid first name format.',
          IS_REQUIRED: 'First name is required.',
          MUST_BE_A_STRING: 'First name must be a string.',
          LENGTH_MUST_BE_FROM_3_TO_30:
            'First name must be between 3 and 30 characters long.',
          INCLUDES_MUL_WHITESPACE:
            'First name cannot contain multiple consecutive whitespaces.',
        },
        LAST_NAME: {
          INVALID: 'Invalid last name format.',
          IS_REQUIRED: 'Last name is required.',
          MUST_BE_A_STRING: 'Last name must be a string.',
          LENGTH_MUST_BE_FROM_3_TO_15:
            'Last name must be between 3 and 15 characters long.',
          INCLUDES_MUL_WHITESPACE:
            'Last name cannot contain multiple consecutive whitespaces.',
        },
        PHONE: {
          INVALID: 'Invalid phone number.',
          MUST_BE_A_STRING: 'Phone number must be a string.',
          LENGTH_MUST_BE_10_CHARACTER:
            'Phone number must be 10 or 11 digits long.',
          LENGTH_MUST_BE_STRING_NUMBER: 'Phone number must be numeric.',
          IS_REQUIRED: 'Phone number is required.',
          IS_INVALID:
            'Invalid phone number. Please provide a valid Vietnamese phone number.',
        },
        PASSWORD: {
          RESET_FAILED: 'Failed to reset password.',
          CHANGE_FAILED: 'Failed to change password.',
          IS_REQUIRED: 'Password is required.',
          MUST_BE_STRONG:
            'Password must meet the strength requirements: 8-16 characters including at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.',
          LENGTH_MUST_BE_FROM_6_TO_20:
            'Password length must be between 6 and 20 characters.',
          CONTAINS_EMOJI: 'Password cannot contain emojis or whitespace.',
          MUST_BE_A_STRING: 'Password must be a string.',
          NOT_SAME_OLD_PASSWORD:
            'New password must not be the same as the old password.',
        },
        CONFIRM_PASSWORD: {
          IS_REQUIRED: 'Confirm_password is required.',
          MUST_BE_THE_SAME_AS_PASSWORD:
            'Confirm_password must match the password.',
          MUST_BE_A_STRING: 'Confirm_password must be a string.',
          LENGTH_MUST_BE_FROM_8_TO_16:
            'Confirm_password length must be between 8 and 16 characters.',
          MUST_BE_STRONG:
            'Confirm_password must meet the strength requirements 8-16 characters including at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.',
          CONTAINS_EMOJI:
            'Confirm password cannot contain emojis or whitespace.',
        },
        OLD_PASSWORD: {
          IS_REQUIRED: 'Old password is required.',
          IS_INCORRECT: 'Old password is incorrect.',
        },
        FILE: {
          INVALID: 'Invalid file type or file too large',
          INVALID_EXTENSION:
            'Invalid file type. Only .jpg, .jpeg, .bmp, .gif, .png are allowed.',
          INVALID_SIZE: 'Image dimensions should not exceed 1024x1024 pixels',
        },
      },
      TOKEN: {
        EMAIL_VERIFY: {
          IS_REQUIRED: 'An email verification token is required.',
          MUST_BE_A_STRING: 'The email verification token must be a string.',
        },
        ACCESS_TOKEN: {
          IS_REQUIRED: 'An access token is required.',
          MUST_BE_A_STRING: 'The access token must be a string.',
        },
        REFRESH_TOKEN: {
          IS_REQUIRED: 'Refresh token is required for logout.',
          IS_NOT_EXIST: 'The refresh token has been used or does not exist.',
          NOT_FOUND: 'Attempted to delete a non-existent refresh token.',
          MUST_BE_A_STRING: 'The refresh token must be a string.',
          IS_NOT_EXIST_IN_COOKIES: 'There is no refresh token in cookies.',
        },
      },
      ROLE: {
        IS_REQUIRED: 'Role is required',
        INVALID_USER_ROLE: 'User role must be valid.',
        USER_ROLE_CAN_NOT_BE_EMPTY: 'User role cannot be empty.',
        DUL_USER_ROLE: 'Updating to the same role is not allowed.',
        USER_EDIT_ROLE_THEMSELVES: 'Users cannot edit their own role.',
        ROLE_IS_EXISTS: 'Role name do not exist in the database',
      },
      LIKE: {
        INVALID_ID: 'Invalid user or product target ID.',
        NOT_ALREADY_LIKE_PRODUCT: 'User has not liked the product.',
        ALREADY_LIKE_PRODUCT: 'User has already liked the product.',
      },
      LOGIN: {
        USER_NOT_FOUND: 'User not found',
        EMAIL_IS_REQUIRED: 'Email is required.',
        EMAIL_MUST_BE_A_STRING: 'Email must be a string.',
        EMAIL_INVALID: 'Email address is invalid',
        EMAIL_ACCESSIBILITY:
          'The email address does not exist. Please use a valid one or register.',
        PASSWORD_IS_REQUIRED: 'Password is required.',
        PASSWORD_MUST_BE_A_STRING: 'Password must be a string.',
        PASSWORD_MUST_BE_STRONG:
          'Password must be 8-16 characters, including at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.',
        PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16:
          'Password length must be between 8 and 16 characters.',
        PASSWORD_IS_INCORRECT: 'The email or password is incorrect.',
        PASSWORD_CONTAINS_EMOJI:
          'Password cannot contains emoji symbol and white space',
        ACCOUNT_IS_UNVERIFIED: 'The account is unverified.',
        ACCOUNT_IS_BANNED: 'The account is banned.',
        ACCOUNT_NOT_FOUND: 'Account not found.',
        ACCOUNT_NOT_EXISTS: 'The user’s account has been removed.',
        EMAIL_OR_PASSWORD: 'Email or password is not correct',
      },
      REGISTER: {
        INVALID_FULLNAME: 'Must be a valid full_name',
        FULL_NAME_IS_REQUIRED: 'Full name is required.',
        FULL_NAME_MUST_BE_A_STRING: 'Full name must be a string.',
        FULL_NAME_LENGTH_MUST_BE_FROM_3_TO_30:
          'Full name length must be between 3 and 30 characters.',
        FULL_NAME_INCLUDES_MUL_WHITESPACE:
          'Full name cannot contain multiple consecutive whitespaces.',
        EMAIL_IS_REQUIRED: 'Email is required.',
        EMAIL_MUST_BE_A_STRING: 'Email must be a valid address.',
        EMAIL_ACCESSIBILITY:
          'The email address is already in use. Please use a different email.',
        PASSWORD_IS_REQUIRED: 'Password is required.',
        PASSWORD_MUST_BE_A_STRING: 'Password must be a string.',
        PASSWORD_MUST_BE_STRONG:
          'Password must meet the strength requirements: 8-16 characters including at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.',
        PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16:
          'Password length must be between 8 and 16 characters.',
        PASSWORD_CAN_NOT_CONTAIN_SPACE: 'Password cannot contain spaces.',
        CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required.',
        CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string.',
        CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD:
          'Confirm password must match the password.',
        CONFIRM_PASSWORD_MUST_BE_STRONG:
          'Confirm password must meet the strength requirements: 8-16 characters including at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.',
        CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16:
          'Confirm password length must be between 8 and 16 characters.',
        INVALID_PHONE: 'Phone number must be valid.',
        PHONE_MUST_BE_A_STRING: 'Phone must be a string.',
        PHONE_LENGTH_MUST_BE_10_CHARACTER:
          'Phone length must be 10 or 11 characters.',
        PHONE_LENGTH_MUST_BE_STRING_NUMBER: 'Phone number must be numeric.',
        PHONE_IS_REQUIRED: 'Phone is required.',
        PHONE_MUST_BE_STRING: 'Phone must be a string.',
        PHONE_IS_INVALID:
          'The phone number is invalid. Please enter a valid Vietnamese phone number.',
      },
      VERIFY_OTP: {
        INVALID_OTP: 'Invalid OTP.',
        IS_REQUIRED: 'OTP is required.',
        IS_NOT_EXIST: 'OTP not found.',
        MUST_BE_A_STRING: 'OTP must be a string.',
        OPT_LENGTH_MUST_BE_6: 'OTP length must be 6 characters.',
        NOT_FOUND_OR_ALREADY_VERIFIED:
          'User not found or OTP already verified.',
        IS_NUMBERIC: 'OTP must be numeric.',
        IS_EXPIRED: 'OTP has expired.',
      },
      VERIFY_FORGOT_PASSWORD_TOKEN: {
        IS_REQUIRED: 'Forgot_password token is required.',
        MUST_BE_A_STRING: 'Forgot_password token must be a string.',
        LENGTH_MUST_BE_6: 'Forgot_password token length must be 6 characters.',
        IS_NOT_EXIST: 'Forgot_password token not found.',
        IS_EXPIRED: 'Forgot_password token has expired.',
        NOT_FOUND_OR_ALREADY_VERIFIED:
          'User not found or forgot_password token already verified.',
        INVALID_TOKEN: 'Invalid forgot_password token.',
        IS_NUMBERIC: 'Forgot_password token must be numeric.',
      },
      PROFILE: {
        FIELD_UPDATE_IS_REQUIRED:
          'At least one field must be specified for updating.',
        INVALID_FULLNAME: 'Full_name must be valid.',
        FULLNAME_INCLUDES_MUL_WHITESPACE:
          'Full name cannot contain multiple consecutive whitespaces.',
        FULL_NAME_MUST_BE_A_STRING: 'Full name must be a string.',
        FULL_NAME_MAX_LENGTH_IS_50:
          'Full name length must be between 4 and 50 characters.',
        INVALID_PHONE: 'Phone number must be valid.',
        PHONE_MUST_BE_A_STRING: 'Phone must be a string.',
        PHONE_LENGTH_MUST_BE_10_CHARACTER:
          'Phone length must be 10 or 11 characters.',
        PHONE_LENGTH_MUST_BE_STRING_NUMBER: 'Phone number must be numeric.',
        PHONE_IS_REQUIRED: 'Phone is required.',
        PHONE_MUST_BE_STRING: 'Phone must be a string.',
        PHONE_IS_INVALID:
          'The phone number is invalid. Please enter a valid Vietnamese phone number.',
        GENDER_MUST_BE_STRING: 'Gender must be a string.',
        GENDER_IS_INVALID:
          'Gender is invalid. Please specify as Male, Female, Other, etc.',
        AVATAR_MUST_BE_STRING: 'Avatar image must be a string.',
        VALID_URL_AVATAR:
          'Avatar URL must be valid and have a valid image extension.',
        VALID_URL_COVER_PHOTO:
          'Cover photo URL must be valid and have a valid image extension.',
        COVER_PHOTO_MUST_BE_STRING: 'Cover photo must be a string.',
        INVALID_ADDRESS: 'Address must be valid.',
        ADDRESS_MUST_BE_STRING: 'Address must be a string.',
        ADDRESS_LENGTH_IS_INVALID:
          'Address length must be between 10 and 200 characters.',
        ADDRESS_INCLUDES_MUL_WHITESPACE:
          'Address cannot contain multiple consecutive whitespaces.',
      },
      FAVORITE: {
        FAVORITE_NOT_EXIT: 'Favorite does not exist.',
        FRIEND_ID_NOT_USER_ID: 'Friend ID is not a user ID.',
        FRIEND_ID_IS_REQUIRED: 'Friend ID is required.',
        FRIEND_ID_IS_EXIT: 'Friend ID exists.',
      },
    },
  },
  CLOUDINARY: {
    KEY: 'Key to access cloudinary',
    SECRET: 'Password to access cloudinary',
    NAME: 'Cloud name of current cloudinary account',
    AVATAR_FOLDER: 'Folder that contain avatar images on cloudinary',
    THUMBNAIL_FOLDER: 'Folder that contain thumbnail images on cloudinary',
    BANNER_FOLDER: 'Folder that contain banner images on cloudinary',
    IMAGE_FOLDER: 'Folder that contain image images on cloudinary',
  },
  ERROR_RESPONSE: {
    TOO_MANY_RES:
      'Too many accounts created from this IP, please try again after a millisecond',
    INTERNAL_SERVER_RES: 'Internal server error',
  },
  API_MESSAGES: {
    BANNER: {
      GET_ALL: {
        MESSAGE_TITLE: 'Get all banner',
        MESSAGE_SUMARY: 'Retrieve a list of banners.',
      },
      PAGINATION: {
        MESSAGE_TITLE:
          'Get a paginated and sorted list of banners with optional filter',
        MESSAGE_SUMARY:
          'Get a paginated and sorted list of banners with optional filters',
      },
      GET_BY_ID: {
        MESSAGE_TITLE: 'Get a banner with id',
        MESSAGE_SUMARY: 'Retrieves a single banner by its unique identifier.',
      },
      CREATE: {
        MESSAGE_TITLE: 'Add a product to the cart',
        MESSAGE_SUMARY:
          'Uploads multiple images for a new banner and inserts the banner details into the database.',
      },
      UPDATE: {
        MESSAGE_TITLE: 'Update a banner',
        MESSAGE_SUMARY: "Updates the specified banner's details.",
      },
      DELETE: {
        MESSAGE_TITLE: 'Delete a single banner',
        MESSAGE_SUMARY:
          'Deletes a specific banner identified by its unique ID.',
      },
      DELETE_ALL: {
        MESSAGE_TITLE: 'Delete multiple banners by IDs',
        MESSAGE_SUMARY:
          'Deletes a specific banner identified by its multiple ID.',
        NOT_FOUND: {
          DESC: 'Some banner IDs were not found',
          MESSAGE: 'The following banner IDs were not found',
        },
      },
    },
    MENU: {
      GET_ALL: {
        MESSAGE_TITLE: 'Get all menu',
        MESSAGE_SUMARY: 'Retrieve a list of menus.',
      },
      PAGINATION: {
        MESSAGE_TITLE:
          'Get a paginated and sorted list of menus with optional filter',
        MESSAGE_SUMARY:
          'Get a paginated and sorted list of menus with optional filters',
      },
      GET_BY_ID: {
        MESSAGE_TITLE: 'Get a menu with id',
        MESSAGE_SUMARY: 'Retrieves a single menu by its unique identifier.',
      },
      CREATE: {
        MESSAGE_TITLE: 'Add a new menu',
        MESSAGE_SUMARY: 'Add a new menu',
      },
      UPDATE: {
        MESSAGE_TITLE: 'Update a menu',
        MESSAGE_SUMARY: "Updates the specified menu's details.",
      },
      DELETE: {
        MESSAGE_TITLE: 'Delete a single menu',
        MESSAGE_SUMARY: 'Deletes a specific menu identified by its unique ID.',
      },
      DELETE_ALL: {
        MESSAGE_TITLE: 'Delete multiple menus by IDs',
        MESSAGE_SUMARY:
          'Deletes a specific menu identified by its multiple ID.',
        NOT_FOUND: {
          DESC: 'Some menu IDs were not found',
          MESSAGE: 'The following menu IDs were not found',
        },
      },
      ADD_FOOD: {
        MESSAGE_TITLE: 'Add food to menu',
        MESSAGE_SUMARY: 'Add food to menu',
      },
      REMOVE_FOOD: {
        MESSAGE_TITLE: 'Remove food from menu',
        MESSAGE_SUMARY: 'Remove food from menu',
      },
      GET_PRODUCT: {
        MESSAGE_TITLE: 'Get all food items in a menu',
        MESSAGE_SUMARY: 'Get all food items in a menu',
      },
    },
    CART: {
      GET_ALL: {
        MESSAGE_TITLE: "Get all items in the user's cart",
        MESSAGE_SUMARY: "Get all items in the user's cart",
      },
      PAGINATION: {
        MESSAGE_TITLE:
          'Get a paginated and sorted list of banners with optional filter',
        MESSAGE_SUMARY:
          'Get a paginated and sorted list of banners with optional filters',
      },
      CREATE: {
        MESSAGE_TITLE: 'Add a product to the cart',
        MESSAGE_SUMARY: 'Add a product to the cart',
      },
      UPDATE: {
        MESSAGE_TITLE: 'Update quantity of a product in the cart',
        MESSAGE_SUMARY: 'Update quantity of a product in the cart',
      },
      DELETE: {
        MESSAGE_TITLE: 'Remove a product from the cart',
        MESSAGE_SUMARY: 'Remove a product from the cart',
      },
      DELETE_ALL: {
        MESSAGE_TITLE: 'Delete multiple product from the cart',
        MESSAGE_SUMARY: 'Delete multiple product from the cart',
      },
    },
    PARTNER: {
      GET_ALL: {
        MESSAGE_TITLE: 'Get all shipping partner',
        MESSAGE_SUMARY: 'Retrieve a list of shipping partners.',
      },
      PAGINATION: {
        MESSAGE_TITLE:
          'Get a paginated and sorted list of shipping partners with optional filter',
        MESSAGE_SUMARY:
          'Get a paginated and sorted list of shipping partners with optional filters',
      },
      GET_BY_ID: {
        MESSAGE_TITLE: 'Get a shipping partner with id',
        MESSAGE_SUMARY:
          'Retrieves a single shipping partner by its unique identifier.',
      },
      CREATE: {
        MESSAGE_TITLE: 'Insert a new shipping partner with image.',
        MESSAGE_SUMARY:
          'Create the shipping partner details into the database.',
      },
      UPDATE: {
        MESSAGE_TITLE: 'Update a shipping partner',
        MESSAGE_SUMARY: "Updates the specified shipping partner's details.",
      },
      DELETE: {
        MESSAGE_TITLE: 'Delete a single shipping partner',
        MESSAGE_SUMARY:
          'Deletes a specific shipping partner identified by its unique ID.',
      },
      DELETE_ALL: {
        MESSAGE_TITLE: 'Delete multiple shipping partners by IDs',
        MESSAGE_SUMARY:
          'Deletes a specific shipping partner identified by its multiple ID.',
        NOT_FOUND: {
          DESC: 'Some shipping partner IDs were not found',
          MESSAGE: 'The following shipping partner IDs were not found',
        },
      },
    },
    STORE: {
      GET_ALL: {
        MESSAGE_TITLE: 'Get all store',
        MESSAGE_SUMARY: 'Retrieve a list of stores.',
      },
      PAGINATION: {
        MESSAGE_TITLE:
          'Get a paginated and sorted list of stores with optional filter',
        MESSAGE_SUMARY:
          'Get a paginated and sorted list of stores with optional filters',
      },
      GET_BY_ID: {
        MESSAGE_TITLE: 'Get a store with id',
        MESSAGE_SUMARY: 'Retrieves a single store by its unique identifier.',
      },
      CREATE: {
        MESSAGE_TITLE: 'Insert a new store with image.',
        MESSAGE_SUMARY: 'Create the store details into the database.',
      },
      UPDATE: {
        MESSAGE_TITLE: 'Update a store',
        MESSAGE_SUMARY: "Updates the specified store's details.",
      },
      DELETE: {
        MESSAGE_TITLE: 'Delete a single store',
        MESSAGE_SUMARY: 'Deletes a specific store identified by its unique ID.',
      },
      DELETE_ALL: {
        MESSAGE_TITLE: 'Delete multiple stores by IDs',
        MESSAGE_SUMARY:
          'Deletes a specific store identified by its multiple ID.',
        NOT_FOUND: {
          DESC: 'Some store IDs were not found',
          MESSAGE: 'The following store IDs were not found',
        },
      },
    },
    PROMOTION: {
      GET_ALL: {
        MESSAGE_TITLE: 'Get all promotion',
        MESSAGE_SUMARY: 'Retrieve a list of promotions.',
      },
      PAGINATION: {
        MESSAGE_TITLE:
          'Get a paginated and sorted list of promotions with optional filter',
        MESSAGE_SUMARY:
          'Get a paginated and sorted list of promotions with optional filters',
      },
      GET_BY_ID: {
        MESSAGE_TITLE: 'Get a promotion with id',
        MESSAGE_SUMARY:
          'Retrieves a single promotion by its unique identifier.',
      },
      CREATE: {
        MESSAGE_TITLE: 'Insert a new promotion with image.',
        MESSAGE_SUMARY: 'Create the promotion details into the database.',
      },
      UPDATE: {
        MESSAGE_TITLE: 'Update a promotion',
        MESSAGE_SUMARY: "Updates the specified promotion's details.",
      },
      DELETE: {
        MESSAGE_TITLE: 'Delete a single promotion',
        MESSAGE_SUMARY:
          'Deletes a specific promotion identified by its unique ID.',
      },
      DELETE_ALL: {
        MESSAGE_TITLE: 'Delete multiple promotions by IDs',
        MESSAGE_SUMARY:
          'Deletes a specific promotion identified by its multiple ID.',
        NOT_FOUND: {
          DESC: 'Some promotion IDs were not found',
          MESSAGE: 'The following promotion IDs were not found',
        },
      },
    },
    VOUCHER: {
      GET_ALL: {
        MESSAGE_TITLE: 'Get all voucher',
        MESSAGE_SUMARY: 'Retrieve a list of vouchers.',
      },
      PAGINATION: {
        MESSAGE_TITLE:
          'Get a paginated and sorted list of vouchers with optional filter',
        MESSAGE_SUMARY:
          'Get a paginated and sorted list of vouchers with optional filters',
      },
      GET_BY_ID: {
        MESSAGE_TITLE: 'Get a voucher with id',
        MESSAGE_SUMARY: 'Retrieves a single voucher by its unique identifier.',
      },
      CREATE: {
        MESSAGE_TITLE: 'Insert a new voucher with image.',
        MESSAGE_SUMARY: 'Inserts the voucher details into the database.',
      },
      UPDATE: {
        MESSAGE_TITLE: 'Update a voucher',
        MESSAGE_SUMARY: "Updates the specified voucher's details.",
      },
      DELETE: {
        MESSAGE_TITLE: 'Delete a single voucher',
        MESSAGE_SUMARY:
          'Deletes a specific voucher identified by its unique ID.',
      },
      DELETE_ALL: {
        MESSAGE_TITLE: 'Delete multiple vouchers by IDs',
        MESSAGE_SUMARY:
          'Deletes a specific voucher identified by its multiple ID.',
        NOT_FOUND: {
          DESC: 'Some voucher IDs were not found',
          MESSAGE: 'The following voucher IDs were not found',
        },
      },
    },
    FOOD: {
      GET_ALL: {
        MESSAGE_TITLE: 'Get all product',
        MESSAGE_SUMARY: 'Retrieve a list of products.',
      },
      PAGINATION: {
        MESSAGE_TITLE:
          'Get a paginated and sorted list of products with optional filter',
        MESSAGE_SUMARY:
          'Get a paginated and sorted list of products with optional filters',
      },
      GET_BY_ID: {
        MESSAGE_TITLE: 'Get a product with id',
        MESSAGE_SUMARY: 'Retrieves a single product by its unique identifier.',
      },
      CREATE: {
        MESSAGE_TITLE: 'Insert a new product with image.',
        MESSAGE_SUMARY:
          'Uploads multiple images for a new product and inserts the product details into the database.',
      },
      UPDATE: {
        MESSAGE_TITLE: 'Update a product',
        MESSAGE_SUMARY: "Updates the specified product's details.",
      },
      DELETE: {
        MESSAGE_TITLE: 'Delete a single product',
        MESSAGE_SUMARY:
          'Deletes a specific product identified by its unique ID.',
      },
      LIKE_PROD: {
        MESSAGE_TITLE: 'Like a food item (add to favorites)',
        MESSAGE_SUMARY: 'Like a food item (add to favorites)',
      },
      UNLIKE_PROD: {
        MESSAGE_TITLE: 'Unlike a food item (remove from favorites)',
        MESSAGE_SUMARY: 'Unlike a food item (remove from favorites)',
      },
      ADD_IMAGE_PROD: {
        MESSAGE_TITLE: 'Add multiple images to a food item',
        MESSAGE_SUMARY: 'Add multiple images to a food item',
        NOT_FOUND: {
          DESC: 'Some product IDs were not found',
          MESSAGE: 'The following product IDs were not found',
        },
      },
      UPDATE_IMAGE_PROD: {
        MESSAGE_TITLE: 'Update a specific image of a food item',
        MESSAGE_SUMARY: 'Update a specific image of a food item',
      },
      DELETE_ALL: {
        MESSAGE_TITLE: 'Delete multiple products by IDs',
        MESSAGE_SUMARY:
          'Deletes a specific product identified by its multiple ID.',
        NOT_FOUND: {
          DESC: 'Some product IDs were not found',
          MESSAGE: 'The following product IDs were not found',
        },
      },
    },
    WISHLIST: {
      GET_ALL: {
        MESSAGE_TITLE: 'Get all food favorite',
        MESSAGE_SUMARY: 'Retrieve a list of food favorite.',
      },
      PAGINATION: {
        MESSAGE_TITLE: 'Get all food favorite using pagination',
        MESSAGE_SUMARY: 'Retrieve a list of food favorite using pagination',
      },
    },
    AUTH: {
      LOGIN: {
        MESSAGE_TITLE: 'Login user into the system',
        MESSAGE_SUMARY:
          'Authenticates a user and returns a token upon successful authentication',
      },
      REGISTER: {
        MESSAGE_TITLE: 'Register a new user',
        MESSAGE_SUMARY: 'Creates a new user account with the provided details.',
      },

      GET_ALL_USER: {
        MESSAGE_TITLE: 'Get all user by admin',
        MESSAGE_SUMARY: 'Retrieve a paginated list of users',
      },
    },
  },
};
