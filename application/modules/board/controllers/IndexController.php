<?php

class Board_IndexController extends Core_Controller_Abstract
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function listAction()
    {
        $model = new Board_Model_Folder();

        $path = $this->getRequest()->getParam('path');
        $dirs = $model->readDir($path);
        $this->returnJson(array(
            'status'    => 'OK',
            'data'      =>  $dirs,
        ));
    }
}