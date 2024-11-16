import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddressService } from './address.service';
import { AuthenticationGuard } from '../../core/guards/auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { UserRole } from '../../utils/constants/enums';
import { MESSAGES } from '../../utils/constants/message';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PaginationDto } from '../../core/dtos/pagination.dto';

@ApiTags('Addresses')
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  // Create a new address
  @ApiBearerAuth('authorization')
  @Post()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({ summary: 'Create a new address' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Address created successfully.',
  })
  async createAddress(@Body() createAddressDto: CreateAddressDto) {
    const result = await this.addressService.create(createAddressDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: MESSAGES.SUCCESS_MESSAGES.ADDRESS.INSERT,
      data: result,
    };
  }

  @Get()
  async getAddresses(@Query() paginationDto: PaginationDto) {
    return this.addressService.getAddresses(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
