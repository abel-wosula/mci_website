<?php

namespace App\Filament\Resources\Media;

use App\Filament\Resources\Media\Pages\CreateMedia;
use App\Filament\Resources\Media\Pages\EditMedia;
use App\Filament\Resources\Media\Pages\ListMedia;
use App\Filament\Resources\Media\Pages\ViewMedia;
use App\Filament\Resources\Media\Schemas\MediaForm;
use App\Models\Media;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables;
use Filament\Tables\Actions\Action;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\DeleteBulkAction;

class MediaResource extends Resource
{
    protected static ?string $model = Media::class;

    public static function table(Table $table): Table
{
    return $table
        ->columns([
            ImageColumn::make('file_path')
                ->label('Image')
                ->disk('public')
                ->rounded()
                ->height(80),

            TextColumn::make('title')
                ->label('Title')
                ->sortable()
                ->searchable(),

            TextColumn::make('description')
                ->label('Description')
                ->limit(50)
                ->sortable()
                ->searchable(),

            TextColumn::make('file_path')
                ->label('File Name')
                ->formatStateUsing(fn ($state) => basename($state))
                ->toggleable(),

            TextColumn::make('created_at')
                ->label('Uploaded At')
                ->dateTime('M d, Y H:i')
                ->sortable(),

            TextColumn::make('updated_at')
                ->label('Updated At')
                ->dateTime('M d, Y H:i')
                ->sortable(),
        ])
        ->defaultSort('created_at', 'desc')
        ->prependActions([
            Tables\Actions\EditAction::make(),
            DeleteAction::make(),
        ])
        ->bulkActions([
            DeleteBulkAction::make(),
        ]);
}

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListMedia::route('/'),
            'create' => CreateMedia::route('/create'),
            'view' => ViewMedia::route('/{record}'),
            'edit' => EditMedia::route('/{record}/edit'),
        ];
    }
}
