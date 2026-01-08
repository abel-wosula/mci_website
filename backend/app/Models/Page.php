<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
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
