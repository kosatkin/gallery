<?php

class Board_IndexController extends Core_Controller_Abstract
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function listAction()
    {
        $model = new Board_Model_Folder(Zend_Controller_Front::getInstance());
        $dirs = $model->readDir('d:\\www\\l.gallery\\public\\files\\Photo');
        $this->returnJson(array(
            'status'    => 'OK',
            'data'      =>  $dirs,
        ));
    }
}