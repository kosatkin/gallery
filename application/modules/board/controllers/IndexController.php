<?php

class Board_IndexController extends Core_Controller_Abstract
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        $model = new Board_Model_Folder(Zend_Controller_Front::getInstance());
        $dirs = $model->readDir('D:\\');
        $this->returnJson($dirs);
    }
}