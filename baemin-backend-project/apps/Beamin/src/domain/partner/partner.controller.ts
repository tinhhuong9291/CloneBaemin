import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PartnerService } from './partner.service';
import { MESSAGES } from '../../utils/constants/message';
import {
  badRequestResponse,
  createPartnerResponse,
  deleteMulPartnerResponse,
  deletePartnerResponse,
  getAllPartnerPaginationResponse,
  getAllPartnerResponse,
  getPartnerByIdResponse,
  internalServerErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
  updatePartnerResponse,
} from '../../swagger/swagger.util';
import moment from 'moment';
import { AuthenticationGuard } from '../../core/guards/auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { UserRole } from '../../utils/constants/enums';
import _ from 'lodash';
import { PaginationDto } from '../../core/dtos/pagination.dto';
import { CreatePartnerDto, UpdatePartnerDto } from './dto/partner.dto';

@ApiTags('Partners')
@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  // Get all shipping partner using pagination
  @ApiBearerAuth('authorization')
  @Get()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.PARTNER.PAGINATION.MESSAGE_TITLE,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Filter by partner name (partial match)',
  })
  @ApiQuery({
    name: 'created_at',
    required: false,
    type: String,
    description: 'Filter by creation date (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'sortField',
    required: false,
    type: String,
    enum: ['name', 'created_at'],
    description: 'Field to sort by (name or created_at)',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    type: String,
    enum: ['asc', 'desc'],
    description: 'Order of sorting (asc or desc)',
  })
  @ApiResponse(getAllPartnerPaginationResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(internalServerErrorResponse())
  async getShippingPartner(@Query() paginationDto: PaginationDto) {
    const result = await this.partnerService.getPartnerPagination(
      paginationDto,
    );
    let { data, pagination } = result;
    let { currentPage, itemsPerPage, totalItems, totalPages } = pagination;
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.PARTNER.GET_ALL,
      data: {
        items: data.map(item => _.omit(item, ['created_at', 'updated_at'])),
        page: currentPage,
        per_page: itemsPerPage,
        total_page: totalPages,
        total_items: totalItems,
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Get all list of menu
  @ApiBearerAuth('authorization')
  @Get('all')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.PARTNER.GET_ALL.MESSAGE_TITLE,
  })
  @ApiResponse(getAllPartnerResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(internalServerErrorResponse())
  async getAllShippingPartner() {
    const result = await this.partnerService.getAllPartner();
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.PARTNER.GET_ALL,
      data: result.map(item => _.omit(item, ['created_at', 'updated_at'])),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Get an existing shipping partner by ID
  @ApiBearerAuth('authorization')
  @Get(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.PARTNER.GET_BY_ID.MESSAGE_TITLE,
  })
  @ApiResponse(getPartnerByIdResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.PARTNER.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.PARTNER.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async getShippingPartnerById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.partnerService.getShippingPartnerById(id);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.PARTNER.GET_BY_ID,
      data: _.pick(result, ['partner_id', 'partner_name', 'service_fee']),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Create a new shipping partner
  @ApiBearerAuth('authorization')
  @Post()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.PARTNER.CREATE.MESSAGE_TITLE,
  })
  @ApiResponse(createPartnerResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.PARTNER.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.PARTNER.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async createShippingPartner(@Body() createPartnerDto: CreatePartnerDto) {
    console.log(createPartnerDto);
    const result = await this.partnerService.createShippingPartner(
      createPartnerDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.PARTNER.INSERT,
      data: _.pick(result, ['partner_id', 'partner_name', 'service_fee']),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Update an existing menu by ID
  @ApiBearerAuth('authorization')
  @Put(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.PARTNER.UPDATE.MESSAGE_TITLE,
  })
  @ApiResponse(updatePartnerResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.PARTNER.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.PARTNER.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async updateShippingPartner(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePartnerDto: UpdatePartnerDto,
  ) {
    const result = await this.partnerService.updateShippingPartner(
      id,
      updatePartnerDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.PARTNER.UPDATE,
      data: _.pick(result, ['partner_id', 'partner_name', 'service_fee']),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Delete a shipping partner  by ID
  @ApiBearerAuth('authorization')
  @Delete(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.PARTNER.DELETE.MESSAGE_TITLE,
  })
  @ApiResponse(deletePartnerResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.PARTNER.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.PARTNER.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async deleteShippingPartner(@Param('id', ParseIntPipe) id: number) {
    await this.partnerService.deleteShippingPartner(id);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.PARTNER.DELETE,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Delete multiple shipping partner by IDs
  @ApiBearerAuth('authorization')
  @Delete('')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.PARTNER.DELETE_ALL.MESSAGE_TITLE,
  })
  @ApiQuery({
    name: 'id',
    required: true,
    isArray: true,
    type: String,
    description: 'IDs of the shipping partner to delete',
  })
  @ApiResponse(deleteMulPartnerResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.API_MESSAGES.PARTNER.DELETE_ALL.NOT_FOUND.DESC,
      MESSAGES.API_MESSAGES.PARTNER.DELETE_ALL.NOT_FOUND.MESSAGE,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async deleteMultipleShippingPartner(@Query('id') ids: string[]) {
    if (!ids || ids.length === 0) {
      throw new BadRequestException('No shipping partner IDs provided');
    }
    await this.partnerService.deleteMulShippingPartner(ids);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.PARTNER.DELETE_ALL,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }
}
