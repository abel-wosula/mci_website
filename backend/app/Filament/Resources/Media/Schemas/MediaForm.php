<?php

namespace App\Filament\Resources\Media\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;

class MediaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                FileUpload::make('file_path')    // <-- this handles auto-update
                ->label('Upload Media')
                ->image()                     // restricts to images
                ->directory('media')          // store in storage/app/media
                ->visibility('public')        // public access via storage link
                ->required()
                ->imagePreviewHeight('250')
                ->enableDownload()            // optional: add download button
                ->preserveFilenames()         // optional: keep original filename
                ->hint('Browse or drag & drop an image'),
            TextInput::make('file_name')
                    ->default(null),
                TextInput::make('media_type')
                    ->required()
                    ->default('image'),
                TextInput::make('alt_text')
                    ->default(null),
                TextInput::make('title')
                    ->default(null),
                Textarea::make('description')
                    ->default(null)
                    ->columnSpanFull(),
                TextInput::make('category_id')
                    ->numeric()
                    ->default(null),
            ]);
    }
}
