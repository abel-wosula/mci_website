<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Media extends Model

{
    use HasFactory;
    protected $table = 'media';

    protected $fillable = [
        'name',
        'file_path',
        'file_name',
        'media_type',
        'alt_text',
        'title',
        'description',
        'category_id'
    ];
}
