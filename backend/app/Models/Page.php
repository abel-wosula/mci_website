<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Page extends Model
{
    use HasFactory;
    protected $table = 'pages';

    protected $fillable = [
        'title',
        'content',
        'slug',
        'is_published',
        'status_id',
    ];

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}
